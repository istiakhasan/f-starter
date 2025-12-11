import React, { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function Home() {
  const parentRef = useRef(null);
  const [search, setSearch] = useState("");

  // 🔥 50k fake products
  const products = Array.from({ length: 50000 }, (_, i) => ({
    id: i + 1,
    name: `Product #${i + 1}`,
    description: `This is a short description for product number ${i + 1}.`,
  }));

  // 🔍 Filter
  const filtered = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  // 🔥 Virtualizer — this must re-render on scroll to work
  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // item height (px)
    overscan: 10,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Home — Virtualized Catalogue</h1>
      <p>Fast list rendering using @tanstack/react-virtual</p>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "15px",
        }}
      />

      <p>Results: {filtered.length}</p>

      {/* 🔥 Scroll container MUST have fixed height + overflow */}
      <div
        ref={parentRef}
        style={{
          height: "500px",
          width: "100%",
          overflow: "auto",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = filtered[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  background: virtualRow.index % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
