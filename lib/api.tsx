const apiUrl = 'http://localhost:1337';
const API_URL = `${apiUrl}/graphql`;
export async function fetchGraphQL(query: string, variables = {}) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store',
    });

    // Check if the response is okay BEFORE parsing JSON
    if (!res.ok) {
        const text = await res.text(); // Get raw text
        console.error("API Error Status:", res.status, res.statusText);
        console.error("API Response Body:", text);
        throw new Error(`Failed to fetch GraphQL: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();

    if (result.errors) {
        throw new Error(`GraphQL Errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
}
export const getImageUrl = (url: string) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${apiUrl}${url}`;
};

export const dataGlobal = `query getGlobal{
  global {
    header {
      logo {
        link
        image {
          url
          caption
        }
      }
      menus {
        style
        name
        link
      }
    }
    seo {
      metaDescription
      metaTitle
      shareImage {
        url
        caption
      }
    }
    siteDecription
    siteName
    favicon {
      caption
      url
    }
    footer {
      logo {
        image {
          caption
          url
        }
        link
      }
      text_bottom
      description
      menufooter {
        title
        text {
          link
          name
        }
      }
    }
  }
}`;

export const dataHome = `query getHome {
  home {
    blocks {
      __typename
      ... on ComponentBlocksBanner {
        button {
          link
          name
          style
        }
        description
        heading {
          title
        }
      }
    ... on ComponentBlocksCapabilities {
        heading {
          title
          text
        }
        lists {
          subtitle
          text
          title
        }
      }
    
      ... on ComponentBlocksContact {
        heading {
          title
          text
        }
        button {
          link
          name
          style
        }
      }
      ... on ComponentBlocksMethod {
        heading {
          text
          title
        }
        accordion_method {
          title
          content {
            image {
              caption
              url
            }
            content
          }
        }
      }
      ... on ComponentBlocksPartners {
        heading {
          text
          title
        }
        lists {
          image {
            caption
            url
          }
          title
        }
      }
      ... on ComponentBlocksIntelligence {
        heading {
          text
          title
        }
        item {
          text
        }
        lists {
          title
          text
          subtitle
        }
      }
      ... on ComponentBlocksEdge {
        title
        description
      }
    
      ... on ComponentBlocksBacked {
        heading {
          title
          text
        }
        items {
          text
        }
        lists {
          title
          text
        }
      }
    }
  }
}`;