// components/OfficineMap.tsx
"use client";

export function OfficineMap() {
  return (
    <div className="mt-4 h-56 w-full rounded-xl overflow-hidden border">
      <iframe
        title="Carte des officines"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2852.4452176945406!2d4.695141376529697!3d44.36244680627086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b50b5d80c18dc9%3A0xfc41e1686b900868!2sPharmacie%20Croix%20d'Or%20-%20Elsie%20Sant%C3%A9!5e0!3m2!1sfr!2sfr!4v1765275480328!5m2!1sfr!2sfr"
        loading="lazy"
        className="h-full w-full border-0"
        style={{ border: 0 }}                       // ✅ objet JS
        allowFullScreen                             // ✅ camelCase
        referrerPolicy="no-referrer-when-downgrade" // ✅ camelCase
      />
    </div>
  );
}
