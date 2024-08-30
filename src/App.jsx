import React from "react";
// import all pages
import { CreateFlashCardPage } from "./pages/CreateFlashCardPage";
import { MyFlashCard } from "./pages/MyFlashCard";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "./pages/Default";
import ShowCardData from "./components/ShowCardData";
export default function App() {
  return (
    <main className="bg-gradient-to-tr bg-red-50 to-white">
      {/* route the pages using Browser router */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/CreateFlashCard" element={<CreateFlashCardPage />} />
          <Route path="/MyFlashCard" element={<MyFlashCard />} />
          <Route path="/showdata/:index" element={<ShowCardData />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
