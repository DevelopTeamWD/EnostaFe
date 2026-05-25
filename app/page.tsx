import FadeIn from '@/components/FadeIn';
import { fetchGraphQL, getImageUrl, dataHome } from '../lib/api';
import "./globals.css";
import { RenderBlocks } from '@/components/RichText';
import parse from 'html-react-parser';
export const dynamic = 'force-dynamic';
export default async function Home() {

  let data = null;
  try {
    const result = await fetchGraphQL(dataHome);
    data = result.home
  } catch (error) {
    console.error("error fetch:", error);
  }
  return (
    <div className="home-page">
      {data.blocks.map((block: any, index: number) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );

}

function BlockRenderer({ block }: { block: any }) {
  switch (block.__typename) {
    case 'ComponentBlocksBanner':
      return (
        <section className="hero">
          <div className="container">
            <h1>{block.heading?.title}</h1>
            <RenderBlocks content={block.description} />
            <a href={block.button?.link} className={`btn btn-primary ${block.button?.style || ''}`}>
              {block.button?.name}
            </a>
          </div>
        </section>
      );
    case 'ComponentBlocksCapabilities':
      return (
        <section className="services" id="services">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{block.heading?.title}</h2>
              <p className="section-subtitle">{block.heading?.text}</p>
            </div>

            <div className="services-grid">
              {block.lists?.map((item: any, index: number) => (
                <div key={index} className="service-card">

                  <h3>{String(index + 1).padStart(2, '0')} / {item?.title}</h3>
                  <p className="tagline">{item?.subtitle}</p>

                  <p>{item?.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'ComponentBlocksMethod':

      return (
        <FadeIn>
          <section className="approach" id="how-we-work">
            <div className="container">
              <div className="section-header fade-up">
                <h2 className="section-title">{block.heading?.title}</h2>
                <p className="section-subtitle">{block.heading?.text}</p>
              </div>

              <div className="steps">
                {block.accordion_method?.map((item: any, index: number) => (
                  <div key={index} className="step fade-up">
                    <div className="step-header">
                      <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                      <h3>{item.title}</h3>
                    </div>

                    <div className="step-body">
                      <div className={`visual-${index + 1} step-visual`}>
                        {item.content.image?.url && (
                          <img
                            src={getImageUrl(item.content.image.url)}
                            alt={String(item.content.image.caption || "Image")}
                          />
                        )}
                      </div>

                      <div className="step-content">
                        <RenderBlocks content={item?.content?.content} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      );



    case 'ComponentBlocksIntelligence':
      return (
        <FadeIn>
          <section className="ai-products" id="advisory">
            <div className="container">
              <div className="section-header fade-up">
                <h2 className="section-title">{block.heading?.title}</h2>
                <p className="section-subtitle">{block.heading?.text}</p>
                <div className="check-badges">
                  {block.item?.map((item: any, index: number) => (
                    <div key={index} className="check-badge">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill="#0F41FF" /></svg>
                      <span>{item?.text}</span>
                    </div>

                  ))}

                </div>
              </div>
              <div className="advisory-grid">
                {block.lists?.map((itemstra: any, idx: number) => (
                  <div key={idx} className={`advisory-card fade-up fade-up-delay-${idx}`}>
                    <div className="advisory-label">{itemstra?.subtitle}</div>
                    <h3>{itemstra?.title}</h3>
                    <p>{itemstra?.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      );
    case 'ComponentBlocksPartners':
      return (
        <section className="who-we-work-with">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{block.heading?.title}</h2>
              <p className="section-subtitle">{block.heading?.text}</p>
            </div>
            <div className="audience-grid">
              {block.lists?.map((item: any, idx: number) => (
                <div key={idx} className="audience-item">{item?.title}</div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'ComponentBlocksEdge':
      return (
        <section className="why-enosta" id="about">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{block?.title}</h2>
            </div>
            <div className="why-content">
              <RenderBlocks content={block?.description} />
            </div>
          </div>
        </section>
      );


    case 'ComponentBlocksBacked':
      return (
        <section className="stats">
          <div className="container">
            <div className="stats-content">
              <div className="stats-text">
                <h2>{parse(block.heading?.title || "")}</h2>
                <p>{block.heading?.text}</p>
                <div className="capabilities-list">
                  {block.items?.map((item: any, idx: number) => (
                    <span key={idx}>{item?.text}</span>
                  ))}
                </div>
              </div>
              <div className="stats-numbers">
                {block.lists?.map((item: any, idx: number) => (
                  <div key={idx} className="stat-item"><div className="number">{item?.title}</div><div className="label">{item?.text}</div></div>

                ))}

              </div>
            </div>
          </div>
        </section>
      );
    case 'ComponentBlocksContact':
      return (
        <section className="cta" id="contact">
          <div className="container">
            <h2>{block.heading?.title}</h2>
            <p>{block.heading?.text}</p>
            <a href={block.button?.link} className={`btn ${block.button?.style ? block.button.style : ''}`}>{block.button?.name}</a>
          </div>
        </section>
      );
    default:
      return null;
  }
}