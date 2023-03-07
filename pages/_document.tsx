import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class SedeoDocument extends Document {
  render() {
    return (
        <Html lang="fr">
          <Head>

          </Head>
          <body>
          <Main />
          <NextScript />
          </body>
        </Html>
    )
  }
}