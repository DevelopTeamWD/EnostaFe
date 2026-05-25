"use client";

import { useState } from "react";

interface HeaderClientProps {
    header: any;
    logoLink: string;
    logoUrl: string;
}

export function Header({
    header,
    logoLink,
    logoUrl,
}: HeaderClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="container">
                <a href={logoLink} className="logo">
                    <img
                        src={logoUrl}
                        alt="Logo"
                        style={{ objectFit: "contain" }}
                    />
                </a>

                {/* Mobile toggle */}
                <div
                    className="toggle-nav"
                    onClick={() => setIsOpen(true)}
                    style={{ cursor: "pointer" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M3 7H21"
                            stroke="#0f41ff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 12H21"
                            stroke="#0f41ff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 17H21"
                            stroke="#0f41ff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Sidebar mobile */}
                <div className={`sidebar-nav ${isOpen ? "active" : ""}`}>
                    <div className="top-nav-mobile">
                        <a href={logoLink} className="logo">
                            <img src={logoUrl} alt="Logo" style={{ objectFit: "contain" }} />
                        </a>
                        <button className="close-btn" onClick={() => setIsOpen(false)} > ✕ </button>
                    </div>

                    <nav>
                        {header?.menus?.map((item: any, index: number) => (
                            <a
                                href={item.link || "#"}
                                className="menu-item"
                                key={`mobile-menu-${index}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="overlay"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Desktop menu */}
                <nav className="desktop-nav">
                    {header?.menus?.map((item: any, index: number) => (
                        <a
                            href={item.link || "#"}
                            className={`menu-item ${item?.style ? `btn ${item.style}` : ""
                                }`}
                            key={`menu-${index}`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}