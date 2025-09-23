import { auth } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CVData {
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  portfolioSite?: string;
  photoUrl?: string | null;
  education: Array<{
    id: string;
    institution: string;
    level: string;
    major: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
  }>;
  experience: Array<{
    id: string;
    position: string;
    company: string;
    employmentType: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  hardSkills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  softSkills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    description?: string;
    projectUrl?: string;
    technologies?: string[];
  }>;
  certificates: Array<{
    id: string;
    documentName: string;
    credentialId?: string | null;
    issuedDate: string;
    expireDate?: string | null;
  }>;
}

export interface CVFilters {
  educationIds?: string[];
  experienceIds?: string[];
  portfolioIds?: string[];
  certificateIds?: string[];
}

// Helper function to get the ID token
const getIdToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

/**
 * Fetch profile resume data with optional filters for education, experience, portfolio, and certificates
 */
export const fetchProfileResume = async (filters?: CVFilters): Promise<CVData> => {
  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (filters?.educationIds && filters.educationIds.length > 0) {
    queryParams.append('educationIds', filters.educationIds.join(','));
  }
  if (filters?.experienceIds && filters.experienceIds.length > 0) {
    queryParams.append('experienceIds', filters.experienceIds.join(','));
  }
  if (filters?.portfolioIds && filters.portfolioIds.length > 0) {
    queryParams.append('portfolioIds', filters.portfolioIds.join(','));
  }
  if (filters?.certificateIds && filters.certificateIds.length > 0) {
    queryParams.append('certificateIds', filters.certificateIds.join(','));
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${API_BASE_URL}/profile-resume?${queryString}` : `${API_BASE_URL}/profile-resume`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch profile resume data' }));
    console.error('Fetch profile resume error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to fetch profile resume data. Status: ${response.status}`);
  }

  return response.json();
};

/**
 * Generate CV HTML using the ResumeTemplate format
 */
export const generateCVHTML = (cvData: CVData): string => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  // Generate dynamic summary text similar to ResumeTemplate
  const generateSummaryText = () => {
    const { experience, hardSkills, softSkills, portfolio, certificates } = cvData;
    const summarySentences: string[] = [];

    // Introduction part from experience
    if (experience && experience.length > 0) {
      const currentOrMostRecentExperience = experience[0];
      let intro = `Seorang profesional`;
      if (currentOrMostRecentExperience.position) {
        intro += ` berpengalaman sebagai ${currentOrMostRecentExperience.position}`;
        if (currentOrMostRecentExperience.company) {
          intro += ` di ${currentOrMostRecentExperience.company}`;
        }
      }
      summarySentences.push(intro.trim() + ".");
    } else {
      summarySentences.push("Seorang profesional yang berdedikasi dan bermotivasi tinggi.");
    }

    // Skills summary
    const mainHardSkills = hardSkills?.slice(0, 3).map(s => s.name) || [];
    const mainSoftSkills = softSkills?.slice(0, 2).map(s => s.name) || [];

    if (mainHardSkills.length > 0) {
      let skillSentence = `Memiliki keahlian dalam ${mainHardSkills.join(', ')}`;
      if (mainSoftSkills.length > 0) {
        skillSentence += `, serta didukung oleh kemampuan interpersonal seperti ${mainSoftSkills.join(' dan ')}.`;
      } else {
        skillSentence += ".";
      }
      summarySentences.push(skillSentence);
    } else if (mainSoftSkills.length > 0) {
      summarySentences.push(`Unggul dalam kemampuan interpersonal seperti ${mainSoftSkills.join(' dan ')}.`);
    }

    // Portfolio/Projects summary
    if (portfolio && portfolio.length > 0) {
      let projectSentence = `Telah terlibat dalam pengembangan ${portfolio.length} proyek`;
      const notableProject = portfolio[0];
      if (notableProject?.title) {
        projectSentence += `, termasuk "${notableProject.title}"`;
        if (notableProject.technologies && notableProject.technologies.length > 0) {
          projectSentence += ` yang memanfaatkan teknologi ${notableProject.technologies.slice(0, 2).join(', ')}.`;
        } else {
          projectSentence += ".";
        }
      } else {
        projectSentence += ".";
      }
      summarySentences.push(projectSentence);
    }

    // Certificates summary
    if (certificates && certificates.length > 0) {
      const notableCertificate = certificates[0];
      let certSentence = `Memiliki ${certificates.length} sertifikat profesional`;
      if (notableCertificate?.documentName) {
        certSentence += `, termasuk "${notableCertificate.documentName}"`;
        certSentence += ` yang diperoleh pada ${formatDate(notableCertificate.issuedDate)}.`;
      } else {
        certSentence += ".";
      }
      summarySentences.push(certSentence);
    }

    // If only default intro and no other data, don't show summary
    if (summarySentences.length <= 1 && summarySentences[0].includes("berdedikasi dan bermotivasi tinggi")) {
      return null;
    }

    return summarySentences.join(' ').replace(/\.\.+/g, '.').trim();
  };

  const summaryText = generateSummaryText();
  const hardSkillsText = cvData.hardSkills.length > 0
    ? cvData.hardSkills.map((s) => s.name).join(", ")
    : "None";
  const softSkillsText = cvData.softSkills.length > 0
    ? cvData.softSkills.map((s) => s.name).join(", ")
    : "None";

  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${cvData.fullName || 'Resume'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #000000;
            background-color: #ffffff;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            margin-left: 20px;
            margin-right: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 32px;
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        h2 {
            font-weight: bold;
            font-size: 16px;
            border-bottom: 1px solid #000000;
            padding-bottom: 4px;
            margin-bottom: 8px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        h3 {
            font-weight: bold;
            font-size: 14px;
            margin: 8px 0 4px 0;
            color: #000000;
        }
        .contact-info {
            margin: 4px 0;
        }
        .summary {
            margin: 12px 0;
            font-size: 11.5px;
            line-height: 1.5;
            text-align: justify;
        }
        .social-links {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin: 12px 0 0 0;
        }
        .social-links a {
            color: #000000;
            text-decoration: underline;
        }
        .section {
            margin-bottom: 24px;
        }
        .item {
            margin-bottom: 12px;
        }
        .item-title {
            font-weight: bold;
        }
        .item-subtitle {
            font-style: italic;
            font-size: 11px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
        }
        .item-title-left {
            font-weight: bold;
            flex: 1;
        }
        .item-date-right {
            font-style: italic;
            font-size: 11px;
            white-space: nowrap;
        }
        .item-description {
            margin-top: 4px;
        }
        .tech-list {
            font-size: 11px;
        }
        .no-data {
            font-style: italic;
        }
        .experience-bullets {
            margin: 4px 0 0 0;
            padding-left: 0;
            list-style-position: outside;
        }
        .experience-bullets li {
            margin-bottom: 2px;
            margin-left: 16px;
            line-height: 1.4;
        }
        
        /* Print optimization */
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header style="margin-bottom: 24px;">
            <h1>${cvData.fullName || "No Name Provided"}</h1>
            
            <!-- Contact Information -->
            <section class="section">
                <h2>CONTACT INFORMATION</h2>
                <p class="contact-info">
                    ${cvData.city || "-"} | ${cvData.phoneNumber || "-"} | ${cvData.fullName ? `${cvData.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com` : "email@example.com"}
                </p>
                
                <!-- Social Links -->
                <div class="social-links">
                    ${cvData.linkedin ? `<a href="${cvData.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
                    ${cvData.github ? `<a href="${cvData.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                    ${cvData.instagram ? `<a href="${cvData.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>` : ''}
                    ${cvData.portfolioSite ? `<a href="${cvData.portfolioSite}" target="_blank" rel="noopener noreferrer">Portfolio</a>` : ''}
                </div>
            </section>
            
            ${summaryText ? `
            <!-- Professional Summary -->
            <section class="section">
                <h2>PROFESSIONAL SUMMARY</h2>
                <p class="summary">
                    ${summaryText}
                </p>
            </section>
            ` : ''}
        </header>

        <!-- Main Content -->
        <main>
            <!-- Education -->
            <section class="section">
                <h2>EDUCATION</h2>
                ${cvData.education.length > 0 ? 
                    cvData.education.map(edu => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title-left">
                                ${edu.level || "Education"}${edu.major ? ` - ${edu.major}` : ""}${edu.institution ? `, ${edu.institution}` : ""}
                            </div>
                            <div class="item-date-right">
                                ${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : "Present"}
                            </div>
                        </div>
                        ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                    </div>
                    `).join('') :
                    '<div class="no-data">No education data available.</div>'
                }
            </section>

            <!-- Work Experience -->
            <section class="section">
                <h2>WORK EXPERIENCE</h2>
                ${cvData.experience.length > 0 ? 
                    cvData.experience.map(exp => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title-left">${exp.position || "Position"} - ${exp.company || "Company"}</div>
                            <div class="item-date-right">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}</div>
                        </div>
                        ${exp.description ? `
                        <ul class="experience-bullets">
                            ${exp.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                        </ul>
                        ` : ''}
                    </div>
                    `).join('') :
                    '<div class="no-data">No experience data available.</div>'
                }
            </section>

            <!-- Projects -->
            <section class="section">
                <h2>PROJECTS</h2>
                ${cvData.portfolio.length > 0 ? 
                    cvData.portfolio.map(project => `
                    <div class="item">
                        <div class="item-title">${project.title}</div>
                        ${project.description ? `
                        <ul class="experience-bullets">
                            ${project.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                        </ul>
                        ` : ''}
                        ${project.technologies && project.technologies.length > 0 ? `
                        <div class="tech-list">
                            Technologies: ${project.technologies.join(", ")}
                        </div>
                        ` : ''}
                    </div>
                    `).join('') :
                    '<div class="no-data">No portfolio projects listed.</div>'
                }
            </section>

            <!-- Certifications -->
            <section class="section">
                <h2>CERTIFICATIONS</h2>
                ${cvData.certificates.length > 0 ? 
                    cvData.certificates.map(cert => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title-left">${cert.documentName}</div>
                            <div class="item-date-right">${formatDate(cert.issuedDate)}${cert.expireDate ? ` - ${formatDate(cert.expireDate)}` : ""}</div>
                        </div>
                        ${cert.credentialId ? `<div class="item-subtitle">Credential ID: ${cert.credentialId}</div>` : ""}
                    </div>
                    `).join('') :
                    '<div class="no-data">No certificates listed.</div>'
                }
            </section>

            <!-- Skills -->
            <section class="section">
                <h2>SKILLS</h2>
                <p style="margin-bottom: 4px;">
                    <strong>Hard skills:</strong> ${hardSkillsText}
                </p>
                <p>
                    <strong>Soft skills:</strong> ${softSkillsText}
                </p>
            </section>
        </main>
    </div>
</body>
</html>
  `;
};

/**
 * Generate CV PDF using Puppeteer (text-searchable and ATS-friendly)
 * Falls back to legacy method if Puppeteer is not available
 */
export const generateCVPDFWithPuppeteer = async (cvData: CVData): Promise<Blob> => {
  try {
    // Check if we're in a browser environment where Puppeteer won't work
    if (typeof window !== 'undefined') {
      console.warn('Puppeteer not available in browser environment, falling back to legacy method');
      return await generateCVPDFLegacy(cvData);
    }
    
    // Dynamically import puppeteer
    const puppeteer = await import('puppeteer');
    
    // Create HTML content with improved styling for PDF
    const htmlContent = generateCVHTML(cvData);
    
    // Launch browser in headless mode
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF with optimized settings for ATS compatibility
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      preferCSSPageSize: true
    }) as Buffer;
    
    // Close browser
    await browser.close();
    
    // Convert buffer to blob
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    return pdfBlob;
    
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    console.warn('Falling back to legacy PDF generation method');
    return await generateCVPDFLegacy(cvData);
  }
};

/**
 * Generate CV PDF using html2canvas and jsPDF (legacy method)
 */
export const generateCVPDFLegacy = async (cvData: CVData): Promise<Blob> => {
  // Dynamically import the libraries
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');
  
  // Create HTML content
  const htmlContent = generateCVHTML(cvData);
  
  // Create a temporary div to render the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '800px'; // Fixed width for consistency
  document.body.appendChild(tempDiv);
  
  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      width: 800,
      height: tempDiv.scrollHeight
    });
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Convert to blob
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
    
  } finally {
    // Clean up temporary div
    document.body.removeChild(tempDiv);
  }
};

/**
 * Generate CV PDF - uses Puppeteer by default for better ATS compatibility
 */
export const generateCVPDF = async (cvData: CVData): Promise<Blob> => {
  try {
    // Try Puppeteer first for better ATS compatibility
    return await generateCVPDFWithPuppeteer(cvData);
  } catch (error) {
    console.warn('Puppeteer PDF generation failed, falling back to legacy method:', error);
    // Fallback to legacy html2canvas method
    return await generateCVPDFLegacy(cvData);
  }
};

export default {
  fetchProfileResume,
  generateCVPDF,
  generateCVPDFWithPuppeteer,
  generateCVPDFLegacy,
  generateCVHTML,
};