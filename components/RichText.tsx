// components/RichText.tsx
import React from 'react';
export const renderText = (node: any, index: number) => {
  if (node.type === 'text') {
    let element = <span key={index}>{node.text}</span>;
    if (node.bold) element = <strong key={index} className="font-bold">{node.text}</strong>;
    if (node.italic) element = <em key={index} className="italic">{node.text}</em>;
    if (node.underline) element = <u key={index} className="underline">{node.text}</u>;
    return element;
  }
  return null;
};

// Hàm xử lý các block chính (paragraph, list, heading)
export const RenderBlocks = ({ content }: { content: any[] }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <>
      {content.map((node, index) => {
        switch (node.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 text-base">
                {node.children.map((child: any, i: number) => renderText(child, i))}
              </p>
            );

          case 'list':
            const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className={node.format === 'ordered' ? 'list-decimal ml-5 mb-4' : 'list-disc ml-5 mb-4'}>
                {node.children.map((item: any, i: number) => (
                  <li key={i} className="mb-1">
                    {item.children.map((child: any, j: number) => renderText(child, j))}
                  </li>
                ))}
              </ListTag>
            );

          case 'heading':
            const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={index} className="font-bold text-xl mb-2">
                {node.children.map((child: any, i: number) => renderText(child, i))}
              </HeadingTag>
            );

          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                {node.children.map((child: any, i: number) => renderText(child, i))}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </>
  );
};