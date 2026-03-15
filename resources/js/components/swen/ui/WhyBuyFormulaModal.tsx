import React from 'react';
import { Modal } from './Modal';

interface WhyBuyFormulaModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function WhyBuyFormulaModal({ isOpen, onClose }: WhyBuyFormulaModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Pourquoi acheter une formule ou un pack de sortie ?" className="w-[90vw] max-w-[90vw]">
			<div className="p-4">
				<div className="flex flex-wrap justify-center gap-4 mb-6 pt-8">
					<div className="flex flex-col items-center w-40 min-w-[120px] flex-1">
						<svg className="w-14 h-14 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4"/></svg>
						<span className="text-center text-lg text-[#10113A]">Profitez de tarifs avantageux<br />sur plusieurs sorties.</span>
					</div>
					<div className="flex flex-col items-center w-40 min-w-[120px] flex-1">
						<svg className="w-14 h-14 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
						<span className="text-center text-lg text-[#10113A]">Réservez vos créneaux en priorité<br />selon vos disponibilités.</span>
					</div>
					<div className="flex flex-col items-center w-40 min-w-[120px] flex-1">
						<svg className="w-14 h-14 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
						<span className="text-center text-lg text-[#10113A]">Bénéficiez d'un suivi personnalisé<br />et d'avantages membres.</span>
					</div>
					<div className="flex flex-col items-center w-40 min-w-[120px] flex-1">
						<svg className="w-14 h-14 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 18a3 3 0 01-6 0"/></svg>
						<span className="text-center text-lg text-[#10113A]">Flexibilité d'utilisation<br />sur la saison.</span>
					</div>
				</div>
			</div>
		</Modal>
	);
}

