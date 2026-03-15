import { Calendar, Waves, Anchor } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/swen/layout/Header';
import { Button } from '@/components/swen/ui/Button';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

function AppContent() {
    const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'account'>('home');
    const { t } = useLanguage();
    const appUrl = import.meta.env.VITE_APP_URL || '';

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <Header currentPage={currentPage} onNavigate={setCurrentPage} />
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 sm:pb-32">
                    <div className="mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-8 items-center">
                            {/* Colonne 1 : Logo SWEN + texte + avantages */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <img
                                    src={`${appUrl}/images/logo.png`}
                                    alt="SWEN Voile"
                                    className="h-20 w-auto mb-4"
                                />
                                <h1 className="text-3xl md:text-4xl font-bold text-[#10113A] mb-1">Plateforme de Réservation</h1>
                                <h2 className="text-xl md:text-2xl font-semibold text-[#10113A] mb-2">Un cadre et une équipe exceptionnels pour vivre la voile à Montréal.</h2>
                                <div className="w-24 h-1 bg-[#D4AF37] mb-4 md:mx-0 mx-auto"></div>
                                <div className="text-lg text-gray-700 leading-relaxed md:leading-loose">
                                    <ul className="list-disc pl-6 text-gray-700 mb-2">
                                        <li>Partenariat exceptionnel entre SWEN, Paré à virer et le Club nautique de Beaconsfield!</li>
                                        <li>Encadrement assuré par des jeunes (de tout âge) passionnés et professionnels.</li>
                                        <li>Ambiance conviviale et sécuritaire</li>
                                        <li>Progression du niveau débutant au Yachtmaster</li>
                                        <li>Accès à des formules adaptées et des packs de sortie</li>
                                    </ul>
                                    <span className="block mt-2 text-sm text-gray-500">Rejoignez-nous et consruisez une communauté qui vie la voile à Montréal dans les meilleures conditions !</span>
                                </div>
                                <div className="flex justify-center md:justify-start mt-4">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f6fa] border border-[#D4AF37] text-[#10113A] font-semibold shadow hover:bg-[#fff] transition"
                                        aria-label="Pourquoi acheter une formule ?"
                                    >
                                        <span className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-[#D4AF37] bg-white mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info w-5 h-5 text-[#D4AF37]"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                        </span>
                                        Pourquoi acheter une formule ou un pack de sortie ?
                                    </button>
                                </div>
                            </div>
                            {/* Colonne 2 : Logos partenaires */}
                            <div className="flex flex-col items-center gap-0">
                                {/* Logos partenaires en colonne */}
                                <img
                                    src="https://pareavirer.com/wp-content/uploads/2023/06/Pare-a-virer-Facebook.jpg"
                                    alt="Paree à virer"
                                    className="h-56 w-72 object-contain hover:grayscale-0 transition rounded "
                                />
                                <img
                                    src="https://tse1.mm.bing.net/th/id/OIP.-80dObRGUlkLLoC9A1Z0GAHaEr?rs=1&pid=ImgDetMain&o=7&rm=3"
                                    alt="Club de voile de Beaconsfield"
                                    className="h-56 w-72 object-contain hover:grayscale-0 transition rounded "
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl flex flex-col min-h-[420px]">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#10113A] to-[#1a1d5a] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Waves className="w-8 h-8 text-white" />
                            </div>
                            <h3
                                className="text-2xl font-bold text-[#10113A] mb-4 text-center"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                            >
                                {t.cards.formulas.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed mb-6 flex-grow">
                                {t.cards.formulas.description}
                            </p>
                            <Button
                                onClick={null}
                                variant="secondary"
                                size="md"
                                className="w-full"
                            >
                                {t.cards.formulas.button}
                            </Button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl flex flex-col min-h-[420px]">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#10113A] to-[#1a1d5a] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h3
                                className="text-2xl font-bold text-[#10113A] mb-4 text-center"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                            >
                                {t.cards.custom.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed mb-6 flex-grow">
                                {t.cards.custom.description}
                            </p>
                            <Button
                                onClick={null}
                                variant="secondary"
                                size="md"
                                className="w-full"
                            >
                                {t.cards.custom.button}
                            </Button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl flex flex-col min-h-[420px]">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#10113A] to-[#1a1d5a] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Anchor className="w-8 h-8 text-white" />
                            </div>
                            <h3
                                className="text-2xl font-bold text-[#10113A] mb-4 text-center"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                            >
                                {t.cards.ownBoat.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed mb-6 flex-grow">
                                {t.cards.ownBoat.description}
                            </p>
                            <Button
                                onClick={null}
                                variant="secondary"
                                size="md"
                                className="w-full"
                            >
                                {t.cards.ownBoat.button}
                            </Button>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-sm text-gray-500">
                            {t.footer.securePayment} • {t.footer.flexibleCancellation} • {t.footer.customerSupport}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Swen() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default Swen;
