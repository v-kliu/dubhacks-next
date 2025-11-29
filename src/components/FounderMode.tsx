import React, { useEffect, useRef, useState } from 'react';

interface FounderModeProps {
  isActive: boolean;
  onExit: () => void;
}

interface TextNodeData {
  node: Text;
  originalText: string;
}

const FounderMode: React.FC<FounderModeProps> = ({ isActive, onExit }) => {
  const [isTransformed, setIsTransformed] = useState(false);
  const textNodesRef = useRef<TextNodeData[]>([]);
  const originalStylesRef = useRef<{
    backgroundColor: string;
    color: string;
    fontFamily: string;
    filter: string;
  } | null>(null);

  // Generate binary string of similar length to original text
  const generateBinary = (length: number): string => {
    let binary = '';
    for (let i = 0; i < length; i++) {
      binary += Math.random() > 0.5 ? '1' : '0';
    }
    return binary;
  };

  // Recursively traverse DOM and collect all text nodes
  const collectTextNodes = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim() || '';
      if (text.length > 0) {
        textNodesRef.current.push({
          node: node as Text,
          originalText: text,
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script, style, and svg elements
      const element = node as HTMLElement;
      if (!['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName)) {
        node.childNodes.forEach((child) => collectTextNodes(child));
      }
    }
  };

  // Transform all text to binary
  const transformToBinary = (): void => {
    textNodesRef.current = [];
    collectTextNodes(document.body);

    textNodesRef.current.forEach(({ node, originalText }) => {
      const binaryText = generateBinary(originalText.length);
      node.textContent = binaryText;
    });
  };

  // Restore all original text
  const restoreText = (): void => {
    textNodesRef.current.forEach(({ node, originalText }) => {
      node.textContent = originalText;
    });
    textNodesRef.current = [];
  };

  // Apply visual transformation
  const applyVisualTransform = (): void => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Save original styles
    originalStylesRef.current = {
      backgroundColor: bodyElement.style.backgroundColor || '',
      color: bodyElement.style.color || '',
      fontFamily: bodyElement.style.fontFamily || '',
      filter: htmlElement.style.filter || '',
    };

    // Apply founder mode styles
    bodyElement.style.backgroundColor = '#000';
    bodyElement.style.color = '#fff';
    bodyElement.style.fontFamily = "'Courier New', Courier, monospace";

    // Vim/Terminal aesthetic: flatten hierarchy, hide images
    const style = document.createElement('style');
    style.id = 'founder-mode-styles';
    style.textContent = `
      /* Hide all images and media except exit button */
      img:not([data-founder-mode-exit]),
      svg:not([data-founder-mode-exit]),
      video,
      canvas,
      picture {
        display: none !important;
      }

      /* Force monospace font on everything */
      * {
        font-family: 'Courier New', Courier, monospace !important;
      }

      /* Flatten font hierarchy - same size for everything */
      h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th, label, input, textarea, button, * {
        font-size: 16px !important;
        line-height: 1.5 !important;
        font-weight: normal !important;
      }

      /* Force black background and white text everywhere */
      *, *::before, *::after {
        background-color: #000 !important;
        color: #fff !important;
        border-color: #fff !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Remove visual transformation
  const removeVisualTransform = (): void => {
    const bodyElement = document.body;
    const htmlElement = document.documentElement;

    if (originalStylesRef.current) {
      bodyElement.style.backgroundColor = originalStylesRef.current.backgroundColor;
      bodyElement.style.color = originalStylesRef.current.color;
      bodyElement.style.fontFamily = originalStylesRef.current.fontFamily;
      htmlElement.style.filter = originalStylesRef.current.filter;
    }

    // Remove custom styles
    const styleElement = document.getElementById('founder-mode-styles');
    if (styleElement) {
      styleElement.remove();
    }

    originalStylesRef.current = null;
  };

  // Main effect to handle activation/deactivation
  useEffect(() => {
    if (isActive && !isTransformed) {
      // Activate founder mode
      applyVisualTransform();

      // Small delay to ensure styles are applied before text transformation
      setTimeout(() => {
        transformToBinary();
        document.body.contentEditable = 'true';
        document.body.style.outline = 'none';
        setIsTransformed(true);
      }, 100);
    } else if (!isActive && isTransformed) {
      // Deactivate founder mode
      document.body.contentEditable = 'false';
      restoreText();
      removeVisualTransform();
      setIsTransformed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isTransformed) {
        document.body.contentEditable = 'false';
        restoreText();
        removeVisualTransform();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isActive) return null;

  return (
    <div
      onClick={onExit}
      className="fixed bottom-8 right-8 w-20 h-20 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 9999,
        backgroundColor: '#E052A0',
        border: 'none'
      }}
      title="Exit Founder Mode"
    >
      <img
        src="/dubhacksnext.png"
        alt="DubHacks Next Logo"
        className="w-full h-full object-cover"
        style={{ filter: 'none' }}
        data-founder-mode-exit="true"
      />
    </div>
  );
};

export default FounderMode;
