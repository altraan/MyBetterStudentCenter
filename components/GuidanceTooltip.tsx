"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility } from "./AccessibilityContext";
import { HelpCircle } from "lucide-react";

interface GuidanceTooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

/**
 * Tooltip component that shows helpful guidance when Step-by-Step Guidance mode is enabled.
 * Wraps interactive elements and shows explanatory tooltips on hover/focus.
 */
export default function GuidanceTooltip({
    content,
    children,
    position = "top"
}: GuidanceTooltipProps) {
    const { stepByStepGuidance } = useAccessibility();
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Don't render tooltip functionality if guidance is disabled
    if (!stepByStepGuidance) {
        return <>{children}</>;
    }

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2"
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-blue-600 border-x-transparent border-b-transparent",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-blue-600 border-x-transparent border-t-transparent",
        left: "left-full top-1/2 -translate-y-1/2 border-l-blue-600 border-y-transparent border-r-transparent",
        right: "right-full top-1/2 -translate-y-1/2 border-r-blue-600 border-y-transparent border-l-transparent"
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}

            {/* Small help indicator */}
            <HelpCircle
                size={14}
                className="absolute -top-1 -right-1 text-blue-500 opacity-75 animate-pulse"
            />

            {/* Tooltip */}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`
                        absolute z-50 ${positionClasses[position]}
                        bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg
                        max-w-xs whitespace-normal font-medium
                        animate-in fade-in-0 zoom-in-95 duration-200
                    `}
                    role="tooltip"
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={`
                            absolute w-0 h-0 border-4 ${arrowClasses[position]}
                        `}
                    />
                </div>
            )}
        </div>
    );
}
