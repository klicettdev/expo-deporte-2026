'use client'

const SocialIcons = {
    TikTok: ({ className = 'h-4 w-4' }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.86-4.46V8.6a8.28 8.28 0 0 0 4.84 1.57v-3.48h-.93Z" />
        </svg>
    ),
    Instagram: ({ className = 'h-4 w-4' }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
        </svg>
    ),
    Facebook: ({ className = 'h-4 w-4' }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
        </svg>
    ),
}

export function Footer({ logo = 'alcaldia.jpg' }: { logo?: string }) {
    return (
        <footer>
            <img src={logo} alt="Alcaldía Bolivariana de Santiago Mariño" />
            <div>
                <span>Expo Deporte 2026</span>
                <small>Presentado por INADEMAR · Santiago Mariño</small>
            </div>
            <div className="socials">
                <a
                    href="https://www.tiktok.com/@expo20261?_r=1&_t=ZS-99EsnO3Q7Do"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="inline-flex flex-col items-center justify-center text-center"
                >
                    <SocialIcons.TikTok className="h-4 w-4 mx-auto" />
                    <span className="text-center w-full">TikTok</span>
                </a>
                <a
                    href="https://www.instagram.com/expo_deporte2026?igsi=NDVvN21xZjBrNGQ4"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex flex-col items-center justify-center text-center"
                >
                    <SocialIcons.Instagram className="h-4 w-4 mx-auto" />
                    <span className="text-center w-full">Instagram</span>
                </a>
                <a
                    href="https://www.facebook.com/share/1HV5mSjT5n/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex flex-col items-center justify-center text-center"
                >
                    <SocialIcons.Facebook className="h-4 w-4 mx-auto" />
                    <span className="text-center w-full">Facebook</span>
                </a>
            </div>
        </footer>
    )
}