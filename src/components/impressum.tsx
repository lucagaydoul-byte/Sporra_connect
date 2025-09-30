import { useNavigate } from "react-router-dom";

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="pt-20">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>
        <p className="mb-4">
          Angaben gemäß § 5 TMG
        </p>
        <p className="mb-2">Max Mustermann</p>
        <p className="mb-2">Musterstraße 123</p>
        <p className="mb-2">60311 Frankfurt am Main</p>
        <p className="mb-2">E-Mail: info@beispiel.de</p>
        <p className="mb-4">Telefon: +49 69 123456</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
        >
          ← Zurück
        </button>
      </div>
    </div>
  );
};

export default Impressum;