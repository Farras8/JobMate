import React from 'react';
import { Zap, Calendar } from 'lucide-react';

interface ActionPlanItem {
    week: number;
    focus: string;
    steps: string[];
}

interface ActionPlanProps {
    actionPlan: ActionPlanItem[];
}

const ActionPlan: React.FC<ActionPlanProps> = ({ actionPlan }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden mx-auto max-w-6xl">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">Action Plan</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Rencana langkah demi langkah untuk meningkatkan CV Anda</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 text-blue-700 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
                        <Calendar size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
                        <span>{actionPlan.length} Weeks</span>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {actionPlan.map((plan, idx) => (
                        <div key={idx} className="group bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-6 sm:translate-x-6 blur-sm"></div>
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                    <h4 className="text-base sm:text-lg font-bold text-gray-800">Week {plan.week}: {plan.focus}</h4>
                                </div>
                                <div className="space-y-2">
                                    {plan.steps.map((step, stepIdx) => (
                                        <div key={stepIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span className="leading-relaxed">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Next Steps</h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Ikuti rencana ini selama {actionPlan.length} minggu untuk mengoptimalkan CV Anda. Prioritaskan langkah-langkah di minggu pertama untuk dampak maksimal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionPlan;