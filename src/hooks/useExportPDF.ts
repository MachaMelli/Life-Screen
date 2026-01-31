'use client';

import { useState } from 'react';

export function useExportPDF() {
    const [isExporting, setIsExporting] = useState(false);

    const exportPDF = async (elementId: string) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        setIsExporting(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');

            // Use A4 portrait format
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            // Get PDF dimensions in mm
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate scaling to fit content on page
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));

            const scaledWidth = imgWidth * 0.264583 * ratio;
            const scaledHeight = imgHeight * 0.264583 * ratio;

            // Center the image
            const x = (pdfWidth - scaledWidth) / 2;
            const y = (pdfHeight - scaledHeight) / 2;

            pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
            pdf.save(`life-screen-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch {
            // Error exporting PDF
        } finally {
            setIsExporting(false);
        }
    };

    return { exportPDF, isExporting };
}
