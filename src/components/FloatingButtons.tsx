"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const branches = [
	{
		name: "Cabang 1",
		address: "Jl Bukit Umbul No 2A, Sumurboto, Banyumanik, Kota Semarang",
		mapsUrl: "https://maps.app.goo.gl/hQoRy71nMUxXfdo29",
	},
	{
		name: "Cabang 2",
		address:
			"Ruko, Jl. Padma Boulevard No.6 AA 2, Tambakharjo, Kec. Semarang Barat, Kota Semarang",
		mapsUrl: "https://maps.app.goo.gl/x7KzvNX7qousG3Ri8",
	},
];

export default function FloatingButtons() {
	const [showMapsModal, setShowMapsModal] = useState(false);
	const [showWAModal, setShowWAModal] = useState(false);

	useEffect(() => {
		console.log("FloatingButtons component mounted and ready for WA modal");
		const handleOpenWA = () => {
			console.log("Opening WA modal via global event");
			setShowWAModal(true);
		};
		window.addEventListener("open-wa-modal", handleOpenWA);
		return () => window.removeEventListener("open-wa-modal", handleOpenWA);
	}, []);

	const waContacts = [
		{
			name: "Sales Ultimate Autoshop Cabang Tembalang",
			number: "6289513301689",
		},
		{
			name: "Sales Ultimateautoshp Cabang Graha Padma",
			number: "089678790110",
		},
	];

	// Helper to format WA number (ensure it starts with 62 and has no leading 0)
	const formatWANumber = (num: string) => {
		let clean = num.replace(/\D/g, "");
		if (clean.startsWith("0")) {
			clean = "62" + clean.slice(1);
		} else if (clean.startsWith("8")) {
			clean = "62" + clean;
		}
		return clean;
	};

	return (
		<>
			<div className="floating-buttons">
				<button
					className="floating-btn"
					onClick={() => setShowMapsModal(true)}
					title="Open in Google Maps">
					<Image
						src="/images/icons/map.png"
						alt="Google Maps"
						width={55}
						height={55}
					/>
				</button>
				<button
					onClick={() => setShowWAModal(true)}
					className="floating-btn"
					title="Chat with us on WhatsApp">
					<Image
						src="/images/icons/wa.png"
						alt="WhatsApp"
						width={55}
						height={55}
					/>
				</button>
			</div>

			{/* Maps Branch Selection Modal */}
			{showMapsModal && (
				<>
					<div
						className="modal-overlay"
						onClick={() => setShowMapsModal(false)}
					/>
					<div className="branch-modal">
						<div className="branch-modal__header">
							<h3>Pilih Lokasi Cabang</h3>
							<button
								className="branch-modal__close"
								onClick={() => setShowMapsModal(false)}>
								×
							</button>
						</div>
						<div className="branch-modal__content">
							{branches.map((branch, index) => (
								<a
									key={index}
									href={branch.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="branch-card"
									onClick={() => setShowMapsModal(false)}>
									<div className="branch-card__icon">
										<i className="fas fa-map-marker-alt"></i>
									</div>
									<div className="branch-card__info">
										<h4>{branch.name}</h4>
										<p>{branch.address}</p>
									</div>
									<div className="branch-card__arrow">
										<i className="fas fa-chevron-right"></i>
									</div>
								</a>
							))}
						</div>
					</div>
				</>
			)}

			{/* WhatsApp Branch Selection Modal */}
			{showWAModal && (
				<>
					<div
						className="modal-overlay"
						onClick={() => setShowWAModal(false)}
					/>
					<div className="branch-modal">
						<div className="branch-modal__header">
							<h3>Pilih Kontak WhatsApp</h3>
							<button
								className="branch-modal__close"
								onClick={() => setShowWAModal(false)}>
								×
							</button>
						</div>
						<div className="branch-modal__content">
							{waContacts.map((contact, index) => (
								<a
									key={index}
									href={`https://wa.me/${formatWANumber(contact.number)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="branch-card"
									onClick={() => setShowWAModal(false)}>
									<div className="branch-card__icon">
										<i className="fab fa-whatsapp"></i>
									</div>
									<div className="branch-card__info">
										<h4>{contact.name}</h4>
										<p>{contact.number}</p>
									</div>
									<div className="branch-card__arrow">
										<i className="fas fa-chevron-right"></i>
									</div>
								</a>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
