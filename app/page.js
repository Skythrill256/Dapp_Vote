//app.js
"use client"
import "../styles/globals.css";
import { VotingProvider } from "../context/voter"
import navbar from "../components/navbar/navbar"
const page = ({ Component, pageProps }) => (
  <VotingProvider>
    <div>
      <navbar />
      <div>
        <Component {...pageProps} />
      </div>
  </div>
    </VotingProvider>
)
export default page