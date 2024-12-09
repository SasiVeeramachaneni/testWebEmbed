"use client";

import React, { useEffect } from "react";


const Issues = () => {

  useEffect(() => {
    const embedParams = {
        pegaServerUrl: 'https://sasiapp-sasi.carz.testdomainlp.com',
        clientId: 'qGsDn1magpXv3ME9',
        authorizeUri: 'https://auth.carz.testdomainlp.com/uas/oauth/authorize',
        theme:
          '{"base":{"palette":{"brand-primary":"#3c8712","foreground-color":"#5e4242","border-line":"#5ac538","app-background":"#b1bde6"}}}',
        startingFields: {},
  
      };

    const loadPegaEmbed = () => {
      const elDiv = document.getElementById("pegaIssuesList");

      if (elDiv) {
        let pegaEmbedHTML = `
      <pega-embed
        id="theEmbed"
        action="openPage"
        pageID="SasiApp__Claims"
        pageClass="PegaPlatform__Data-Portal"
        assignmentHeader=false
        caseTypeID="Claim"
        autoReauth="true"
        pegaServerType="launchpad"
        pegaServerUrl="${embedParams.pegaServerUrl}"
        grantType="authCode"
        casePage="full"
        authorizeUri="${embedParams.authorizeUri}"
        theme='${embedParams.theme}'
        clientId="${embedParams.clientId}"
        style="width: 100%; height: 100%">
    `;

        // Conditionally add the theme attribute if it exists
        if (embedParams.theme) {
          pegaEmbedHTML += ` theme='${embedParams.theme}'`;
        }

        // Close the pega-embed tag
        pegaEmbedHTML += `></pega-embed>`;

        // Set the innerHTML
        elDiv.innerHTML = pegaEmbedHTML;
      }
    };

    const loadScript = () => {
      // Check if the script already exists
      if (
        !document.querySelector(
            "script[src='https://lp.constellation.pega.com/integrated/react/prod/pega-embed.js']"
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://lp.constellation.pega.com/integrated/react/prod/pega-embed.js";
        script.async = true;
        script.onload = () => {
          loadPegaEmbed();
        };
        document.head.appendChild(script);
      } else {
        // If script already exists, directly initialize the Pega embed
        loadPegaEmbed();
      }
    };
    loadScript();
  }, []);

  return (
    <section>
          <div
            id="pegaIssuesList"
            style={{
              margin: "10px 0px 10px 10px",
            }}
          ></div>
    </section>
  );
};

export default Issues;
