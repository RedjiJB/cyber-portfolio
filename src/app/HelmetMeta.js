import React from "react";
import Helmet from "react-helmet";
import { useLocation } from "react-router-dom";
import Resume from "../settings/resume.json";
import Settings from "../settings/settings.json";
import { metaFor, SITE_NAME, SOCIAL_IMAGE } from "../seo/pageMeta";

// Per-route head tags. scripts/prerender.js writes the same tags into each
// static page (marked data-react-helmet) so Helmet takes them over on load.
export const HelmetMeta = () => {
    const { pathname } = useLocation();
    const meta = metaFor(pathname);

    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta name="theme-color" content={Settings.colors.primary} />
            <meta name="author" content={Resume.basics.name} />
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={Resume.basics.keywords} />
            <meta name="robots" content={meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />
            <link rel="canonical" href={meta.url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={meta.url} />
            <meta property="og:image" content={SOCIAL_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={SOCIAL_IMAGE} />
            {meta.jsonLd && (
                <script type="application/ld+json">{JSON.stringify(meta.jsonLd)}</script>
            )}
        </Helmet>
    );
};
