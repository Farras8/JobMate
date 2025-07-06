import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Clock, User, ArrowLeft, Volume2, Settings } from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface InterviewData {
    position: string;
    company: string;
    experienceLevel: string;
    interviewType: string;
}

const InterviewSessionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [interviewData] = useState<InterviewData>(location.state || {
        position: 'Frontend Developer',
        company: 'Tech Company',
        experienceLevel: 'Junior',
        interviewType: 'HR Interview'
    });

    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
    const [cameraLoading, setCameraLoading] = useState(true);
    const [cameraError, setCameraError] = useState(false);

    const sampleQuestions = [
        "Tell me about yourself and why you're interested in this position.",
        "What are your greatest strengths and how do they relate to this role?",
        "Describe a challenging project you've worked on and how you overcame obstacles.",
        "Where do you see yourself in 5 years?",
        "Why do you want to work at our company?"
    ];

    const initializeCamera = useCallback(async () => {
        try {
            setCameraLoading(true);
            setCameraError(false);
            
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setStream(mediaStream);
            
            // Camera stream acquired successfully, loading will be set to false when video loads
            console.log('Camera stream acquired');
            
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCameraLoading(false);
            setCameraError(true);
            Swal.fire({
                title: 'Camera Access',
                text: 'Tidak dapat mengakses camera. Pastikan browser memiliki permission untuk menggunakan camera.',
                icon: 'warning',
                confirmButtonText: 'Mengerti',
                customClass: { popup: 'rounded-xl' },
                backdrop: 'rgba(0,0,0,0.3)',
                allowOutsideClick: true
            });
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        // Initialize camera
        initializeCamera();

        // Fallback timeout to prevent infinite loading
        const loadingTimeout = setTimeout(() => {
            if (cameraLoading) {
                console.log('Camera loading timeout, setting loading to false');
                setCameraLoading(false);
            }
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(loadingTimeout);
        };
    }, [initializeCamera, cameraLoading]);

    // Separate effect for cleanup
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    // Effect to handle stream assignment to video element
    useEffect(() => {
        if (stream && videoRef) {
            videoRef.srcObject = stream;
            setCameraLoading(false);
        }
    }, [stream, videoRef]);

    const toggleVideo = useCallback(() => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !isVideoOn;
                setIsVideoOn(!isVideoOn);
                console.log(`Video ${!isVideoOn ? 'enabled' : 'disabled'}`);
            }
        } else {
            console.log('No stream available for video toggle');
        }
    }, [stream, isVideoOn]);

    const toggleAudio = useCallback(() => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !isMicOn;
                setIsMicOn(!isMicOn);
                console.log(`Audio ${!isMicOn ? 'enabled' : 'disabled'}`);
            } else {
                console.log('No audio track available');
                // Show alert if no audio track
                Swal.fire({
                    title: 'Audio Not Available',
                    text: 'Microphone track tidak tersedia. Pastikan browser memiliki permission untuk menggunakan microphone.',
                    icon: 'warning',
                    confirmButtonText: 'Mengerti',
                    customClass: { popup: 'rounded-xl' },
                    backdrop: 'rgba(0,0,0,0.3)',
                    allowOutsideClick: true
                });
            }
        } else {
            console.log('No stream available for audio toggle');
            // Show alert if no stream
            Swal.fire({
                title: 'Camera Not Initialized',
                text: 'Camera belum diinisialisasi. Silakan tunggu atau refresh halaman.',
                icon: 'warning',
                confirmButtonText: 'Mengerti',
                customClass: { popup: 'rounded-xl' },
                backdrop: 'rgba(0,0,0,0.3)',
                allowOutsideClick: true
            });
        }
    }, [stream, isMicOn]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Spacebar to toggle microphone (when not typing in input)
            if (event.code === 'Space' && event.target === document.body) {
                event.preventDefault();
                toggleAudio();
            }
            // 'V' key to toggle video
            if (event.code === 'KeyV' && event.target === document.body) {
                event.preventDefault();
                toggleVideo();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [toggleAudio, toggleVideo]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndInterview = () => {
        Swal.fire({
            title: 'Fitur Dalam Pengembangan',
            text: 'Fitur end interview dan hasil evaluasi akan segera tersedia.',
            icon: 'warning',
            confirmButtonText: 'Mengerti',
            customClass: { popup: 'rounded-xl' },
            backdrop: 'rgba(0,0,0,0.3)',
            allowOutsideClick: true
        }).then(() => {
            navigate('/ai-interview');
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < sampleQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            Swal.fire({
                title: 'Fitur Dalam Pengembangan',
                text: 'Fitur analisis hasil interview akan segera tersedia.',
                icon: 'warning',
                confirmButtonText: 'Mengerti',
                customClass: { popup: 'rounded-xl' },
                backdrop: 'rgba(0,0,0,0.3)',
                allowOutsideClick: true
            });
        }
    };

    const handleStartRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            Swal.fire({
                title: 'Fitur Dalam Pengembangan',
                text: 'Fitur perekaman jawaban akan segera tersedia.',
                icon: 'info',
                confirmButtonText: 'Mengerti',
                customClass: { popup: 'rounded-xl' },
                backdrop: 'rgba(0,0,0,0.3)',
                allowOutsideClick: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/ai-interview')}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                        >
                            <ArrowLeft size={20} className="text-white" />
                        </button>
                        <div>
                            <h1 className="text-white font-bold text-lg">AI Interview Session</h1>
                            <p className="text-blue-200 text-sm">{interviewData.position} • {interviewData.company}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                            <Clock size={16} />
                            <span className="font-mono">{formatTime(timeElapsed)}</span>
                        </div>
                        
                        {/* Microphone Status */}
                        <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-full ${isMicOn ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {isMicOn ? (
                                    <Mic size={14} className="text-green-400" />
                                ) : (
                                    <MicOff size={14} className="text-red-400" />
                                )}
                            </div>
                            <span className={`text-xs font-medium ${isMicOn ? 'text-green-400' : 'text-red-400'}`}>
                                {isMicOn ? 'Mic On' : 'Mic Off'}
                            </span>
                        </div>
                        
                        <div className="text-white text-sm">
                            Question {currentQuestion + 1} of {sampleQuestions.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 h-full">
                    {/* Left - Video Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Interviewer Video */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">AI Interviewer</h3>
                                        <p className="text-blue-200 text-sm">Sarah - Senior HR Manager</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm">Online</span>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl h-64 flex items-center justify-center border border-white/10">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User size={32} className="text-white" />
                                    </div>
                                    <p className="text-white/80">AI Interviewer Avatar</p>
                                    <p className="text-blue-200 text-sm mt-1">Voice & Visual AI Coming Soon</p>
                                </div>
                            </div>
                        </div>

                        {/* Your Video */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-semibold">Your Video</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleVideo}
                                        title={isVideoOn ? 'Turn off camera (V)' : 'Turn on camera (V)'}
                                        className={`p-2 rounded-lg transition-colors duration-200 ${
                                            isVideoOn ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        }`}
                                    >
                                        {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                                    </button>
                                    <button
                                        onClick={toggleAudio}
                                        title={isMicOn ? 'Mute microphone (Space)' : 'Unmute microphone (Space)'}
                                        className={`p-2 rounded-lg transition-colors duration-200 ${
                                            isMicOn ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        }`}
                                    >
                                        {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Keyboard shortcuts info */}
                            <div className="mb-2 text-center">
                                <p className="text-xs text-blue-200/70">
                                    Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Space</kbd> to toggle mic, {' '}
                                    <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">V</kbd> to toggle camera
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl h-48 flex items-center justify-center border border-white/10 relative overflow-hidden">
                                {(cameraLoading || (!stream && !cameraError)) && (
                                    <div className="text-center">
                                        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                        <p className="text-white/80">Loading Camera...</p>
                                        <p className="text-blue-200 text-sm mt-1">Please allow camera access</p>
                                    </div>
                                )}
                                
                                {cameraError && !cameraLoading && (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <VideoOff size={24} className="text-red-400" />
                                        </div>
                                        <p className="text-red-400 mb-2">Camera Error</p>
                                        <button
                                            onClick={initializeCamera}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
                                        >
                                            Retry Camera
                                        </button>
                                    </div>
                                )}
                                
                                {!cameraError && isVideoOn && stream && (
                                    <video
                                        ref={(ref) => {
                                            if (ref && ref !== videoRef) {
                                                setVideoRef(ref);
                                            }
                                        }}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover rounded-xl"
                                        onLoadedMetadata={(e) => {
                                            const video = e.target as HTMLVideoElement;
                                            video.play().then(() => {
                                                setCameraLoading(false);
                                                console.log('Video playing successfully');
                                            }).catch((error) => {
                                                console.error('Error playing video:', error);
                                                setCameraLoading(false);
                                            });
                                        }}
                                        onCanPlay={() => {
                                            setCameraLoading(false);
                                        }}
                                        onError={(e) => {
                                            console.error('Video error:', e);
                                            setCameraLoading(false);
                                            setCameraError(true);
                                        }}
                                    />
                                )}
                                
                                {!cameraError && !isVideoOn && (
                                    <div className="text-center">
                                        <VideoOff size={32} className="text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-400">Camera Off</p>
                                    </div>
                                )}
                                
                                {/* Video overlay indicators */}
                                {!cameraLoading && !cameraError && (
                                    <>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${isVideoOn ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                                            <span className={`text-xs font-medium ${isVideoOn ? 'text-green-200' : 'text-red-200'}`}>
                                                {isVideoOn ? 'Live' : 'Off'}
                                            </span>
                                        </div>
                                        
                                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                            {!isMicOn && (
                                                <div className="flex items-center gap-1 bg-red-500/80 rounded-full px-2 py-1">
                                                    <MicOff size={12} className="text-white" />
                                                    <span className="text-xs font-medium text-white">Muted</span>
                                                </div>
                                            )}
                                            {isMicOn && (
                                                <div className="flex items-center gap-1 bg-green-500/80 rounded-full px-2 py-1">
                                                    <Mic size={12} className="text-white" />
                                                    <span className="text-xs font-medium text-white">Live</span>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right - Question & Controls */}
                    <div className="space-y-6">
                        {/* Current Question */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare size={20} className="text-blue-400" />
                                <h3 className="text-white font-semibold">Current Question</h3>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-white/10">
                                <p className="text-white/90 leading-relaxed">
                                    {sampleQuestions[currentQuestion]}
                                </p>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2">
                                <Volume2 size={16} className="text-blue-400" />
                                <span className="text-blue-200 text-sm">AI is speaking...</span>
                            </div>
                        </div>

                        {/* Recording Controls */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-white font-semibold mb-4">Recording Controls</h3>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={handleStartRecording}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                                        isRecording 
                                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                                            : 'bg-green-500 hover:bg-green-600 text-white'
                                    }`}
                                >
                                    <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
                                    {isRecording ? 'Stop Recording' : 'Start Recording Answer'}
                                </button>
                                
                                <button
                                    onClick={handleNextQuestion}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-200"
                                >
                                    {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                                </button>
                            </div>
                        </div>

                        {/* Interview Progress */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-white font-semibold mb-4">Interview Progress</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm text-blue-200 mb-2">
                                        <span>Questions</span>
                                        <span>{currentQuestion + 1}/{sampleQuestions.length}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <div className="text-center pt-2">
                                    <p className="text-blue-200 text-sm">Estimated time remaining</p>
                                    <p className="text-white font-semibold">{15 - Math.floor(timeElapsed / 60)} minutes</p>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Controls */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="space-y-3">
                                <button
                                    onClick={() => Swal.fire({
                                        title: 'Fitur Dalam Pengembangan',
                                        text: 'Fitur pause interview sedang dalam pengembangan!',
                                        icon: 'warning',
                                        confirmButtonText: 'Mengerti',
                                        customClass: { popup: 'rounded-xl' },
                                        backdrop: 'rgba(0,0,0,0.3)',
                                        allowOutsideClick: true
                                    })}
                                    className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <Settings size={16} />
                                    Pause Interview
                                </button>
                                
                                <button
                                    onClick={handleEndInterview}
                                    className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <Phone size={16} />
                                    End Interview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSessionPage;
