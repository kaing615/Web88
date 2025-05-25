const uiConfigs = {
    style: {
        gradientBgImage: {
            dark: {
                backgroundImage: "Linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            },
            light: {
                backgroundImage: "Linear-gradient(to top, rgba(245, 245, 245, 1), rgba(0, 0, 0, 0))",
            }
        },
        horizontalGradientBgImage: {
            dark: {
                backgroundImage: "Linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            },
            light: {
                backgroundImage: "Linear-gradient(to right, rgba(245, 245, 245, 1), rgba(0, 0, 0, 0))",
            }
        },
        typoLines: (lines, textAlign) => {
            textAlign = textAlign || "justify";
            return {
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lines,
                textAlign: textAlign
            };
        },
        mainContent: {
            maxWidth: "1366px",
            margin: "auto",
            padding: 2
        },
        backgroundImage: {
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "darkgrey",
            //backgroundImage: `url(${imgPath})`
        },
        size: {
            sidebarWidth: "300px",
            contentMaxWidth: "1366px",
        }
    }
}

export default uiConfigs;