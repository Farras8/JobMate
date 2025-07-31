import React from 'react';
import type { CVData } from '../services/CVService';

interface ResumePreviewProps {
  cvData: CVData;
}

export default function ResumePreview({ cvData }: ResumePreviewProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  // Generate dynamic summary text
  const generateSummaryText = () => {
    const { experience, hardSkills, softSkills, portfolio } = cvData;
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

  return (
    <div 
      id="cv-preview"
      className="max-w-4xl mx-auto p-8 font-sans bg-white"
      style={{
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: '12px',
        lineHeight: 1.4,
        marginLeft: '20px',
        marginRight: '20px',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          {cvData.fullName || "No Name Provided"}
        </h1>
        <p style={{ margin: "4px 0" }}>
          {cvData.city || "-"} | {cvData.phoneNumber || "-"}
        </p>
        
        {/* Summary */}
        {summaryText && (
          <p style={{ 
            margin: "12px 0",
            fontSize: '11.5px',
            lineHeight: 1.5,
            textAlign: 'justify',
            fontStyle: 'normal'
          }}>
            {summaryText}
          </p>
        )}

        {/* Social Links */}
        <p style={{ 
          margin: summaryText ? "12px 0 0 0" : "8px 0 0 0",
          display: "flex", 
          gap: '16px', 
          flexWrap: "wrap" 
        }}>
          {cvData.linkedin && (
            <a href={cvData.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: "underline" }}>
              LinkedIn
            </a>
          )}
          {cvData.github && (
            <a href={cvData.github} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: "underline" }}>
              GitHub
            </a>
          )}
          {cvData.instagram && (
            <a href={cvData.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: "underline" }}>
              Instagram
            </a>
          )}
          {cvData.portfolioSite && (
            <a href={cvData.portfolioSite} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: "underline" }}>
              Portfolio
            </a>
          )}
        </p>
      </header>

      {/* Sections */}
      <main>
        {/* Education */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontWeight: "bold", fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '8px', color: '#000000' }}>
            Education
          </h2>
          {cvData.education.length > 0 ? (
            cvData.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: "bold" }}>
                  {edu.level || "Education"}{" "}
                  {edu.major ? `- ${edu.major}` : ""}
                  {edu.institution ? `, ${edu.institution}` : ""}
                </div>
                <div style={{ fontStyle: "italic", fontSize: '11px' }}>
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
                {edu.gpa && (
                  <div style={{ marginTop: '4px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))
          ) : (
            <div style={{ fontStyle: "italic" }}>No education data available.</div>
          )}
        </section>

        {/* Experience */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontWeight: "bold", fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '8px', color: '#000000' }}>
            Experience
          </h2>
          {cvData.experience.length > 0 ? (
            cvData.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: "bold" }}>{exp.position || "Position"}</div>
                <div style={{ fontStyle: "italic", fontSize: '11px' }}>
                  {exp.company || "-"} | {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </div>
                {exp.description && <div style={{ marginTop: '4px' }}>{exp.description}</div>}
              </div>
            ))
          ) : (
            <div style={{ fontStyle: "italic" }}>No experience data available.</div>
          )}
        </section>

        {/* Portfolio */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontWeight: "bold", fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '8px', color: '#000000' }}>
            Portfolio
          </h2>
          {cvData.portfolio.length > 0 ? (
            cvData.portfolio.map((project, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: "bold" }}>{project.title}</div>
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: "underline" }}>
                    {project.projectUrl}
                  </a>
                )}
                {project.description && <div>{project.description}</div>}
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ fontSize: '11px' }}>
                    Technologies: {project.technologies.join(", ")}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ fontStyle: "italic" }}>No portfolio projects listed.</div>
          )}
        </section>

        {/* Certificates */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontWeight: "bold", fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '8px', color: '#000000' }}>
            Certificates
          </h2>
          {cvData.certificates && cvData.certificates.length > 0 ? (
            cvData.certificates.map((cert, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: "bold" }}>{cert.documentName || "Certificate"}</div>
                <div style={{ fontStyle: "italic", fontSize: '11px' }}>
                  {formatDate(cert.issuedDate)}
                  {cert.expireDate ? ` - ${formatDate(cert.expireDate)}` : " - Does not expire"}
                </div>
                {cert.credentialId && (
                  <div style={{ marginTop: '4px' }}>Credential ID: {cert.credentialId}</div>
                )}
              </div>
            ))
          ) : (
            <div style={{ fontStyle: "italic" }}>No certificates listed.</div>
          )}
        </section>

        {/* Skills combined */}
        <section>
          <h2 style={{ fontWeight: "bold", fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '8px', color: '#000000' }}>
            Skills
          </h2>
          <p style={{ marginBottom: '4px' }}>
            <strong>Hard skills:</strong> {hardSkillsText}
          </p>
          <p>
            <strong>Soft skills:</strong> {softSkillsText}
          </p>
        </section>
      </main>
    </div>
  );
}