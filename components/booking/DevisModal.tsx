"use client";
import { Button } from "../ui/button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Ensure this path is correct
import { Checkbox } from "../ui/checkbox"; // Assuming you have a Checkbox component from shadcn/ui
import { Label } from "../ui/label"; // Assuming you have a Label component
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "@/navigation"; // Ensure this path is correct
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const topographyServices = [
  { id: "implantation", name: "Travaux d'implantation d'ouvrages de tout type", price: 3500 },
  { id: "foncieres", name: "Études foncières", price: 4000 },
  { id: "topographique_3d", name: "Travaux et étude topographique 3D", price: 5500 },
  { id: "lotissement", name: "Lotissement - Morcellement", price: 6000 },
  { id: "routes_voirie", name: "Travaux de routes et de voirie", price: 7000 },
  { id: "batiments", name: "Travaux de bâtiments", price: 4500 },
  { id: "prestations_topo_admin", name: "Prestations topographiques et administratives", price: 3000 },
  { id: "etudes_techniques", name: "Études techniques et ingénierie", price: 8000 },
  { id: "expertise_topo", name: "Expertise topographique", price: 5000 },
];

const DevisModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [total, setTotal] = useState(0);
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Store IDs of selected services
  const [loading, setLoading] = useState(false);

  const t = useTranslations("devisModal"); // Using a more specific namespace for translations
  const router = useRouter();

  const calculateTotal = (currentSelectedServices: string[]) => {
    let currentTotal = 0;
    currentSelectedServices.forEach((serviceId) => {
      const service = topographyServices.find((s) => s.id === serviceId);
      if (service) {
        currentTotal += service.price;
      }
    });
    setTotal(currentTotal);
  };

  useEffect(() => {
    calculateTotal(selectedServices);
  }, [selectedServices]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prevSelectedServices) => {
      const newSelectedServices = prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId];
      return newSelectedServices;
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value);
  };

  const generateDevisPDF = () => {
    try {
      const doc = new jsPDF();
      const today = new Date();
      const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

      // Company Info (Optional - you can add your logo and address here)
      doc.setFontSize(18);
      doc.text("Devis Topographique", 14, 22);
      doc.setFontSize(11);
      doc.text(`Date: ${formattedDate}`, 14, 30);
      doc.text("Mogador Topo", 150, 22, { align: "right" }); // Replace with your company name
      doc.text("Essaouira", 150, 28, { align: "right" }); // Replace with your address

      // Client Info
      doc.setFontSize(12);
      doc.text("Client:", 14, 45);
      doc.setFontSize(10);
      doc.text(`Nom: ${name}`, 14, 52);
      doc.text(`Email: ${email}`, 14, 58);
      doc.text(`Téléphone: ${phoneNumber || "Non fourni"}`, 14, 64);

      let yPosition = 70;
      if (info) {
        doc.text(`Informations supplémentaires:`, 14, yPosition);
        const splitInfo = doc.splitTextToSize(info, 180); // Wrap text
        yPosition += 6;
        doc.text(splitInfo, 14, yPosition);
        yPosition += splitInfo.length * 4; // Adjust based on number of lines
      }

      // Services Table
      const tableColumn = ["Service", "Prix (MAD)"];
      const tableRows: (string | number)[][] = [];

      const servicesDetails = selectedServices.map(id => {
        const service = topographyServices.find(s => s.id === id);
        return service ? { name: service.name, price: service.price } : null;
      }).filter(Boolean);

      servicesDetails.forEach(service => {
        if (service) {
          const serviceData = [
            service.name,
            service.price.toFixed(2),
          ];
          tableRows.push(serviceData);
        }
      });

      autoTable(doc, {
        startY: yPosition + 10,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] }, // Example header color
        foot: [['Total', total.toFixed(2)]],
        footStyles: { fontStyle: 'bold', fontSize: 12, fillColor: [220, 220, 220] },
      });

      doc.save(`devis-${name.replace(/\s+/g, '_') || 'client'}-${formattedDate.replace(/\//g, '-')}.pdf`);
      return true;
    } catch (error) {
      console.error("PDF Generation Error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      toast.error(t("errorNoService"));
      return;
    }
    setLoading(true);

    // 1. Generate and download PDF
    const pdfGenerated = generateDevisPDF();
    if (!pdfGenerated) {
      toast.error(t("errorPdf"));
      setLoading(false);
      return;
    }

    // 2. Prepare data for API
    const servicesForApi = selectedServices.map(id => {
      const service = topographyServices.find(s => s.id === id);
      return service ? { name: service.name, price: service.price } : null;
    }).filter(Boolean); // Remove nulls if any service ID was somehow invalid

    const data = {
      name,
      email,
      phoneNumber,
      requestedServices: servicesForApi,
      totalPrice: total,
      additionalInfo: info,
      requestDate: new Date().toISOString(),
    };

    // 3. Send data to backend
    try {
      const response = await fetch("/api/booking", { // Or a new endpoint like "/api/devis-request"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // router.push("/thankyou"); // Consider a different thank you page
        toast.success(t("successMessage"));
        console.log("Devis request sent successfully!");
        // Optionally reset form
        setName("");
        setEmail("");
        setPhoneNumber(undefined);
        setInfo("");
        setSelectedServices([]);
        setTotal(0);
      } else {
        const errorData = await response.json().catch(() => ({ message: t("errorApiDefault") }));
        toast.error(errorData.message || t("errorApi"));
        console.error("Failed to send devis request to the backend.");
      }
    } catch (error) {
      toast.error(t("errorNetwork"));
      console.error("Error sending devis request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="backdrop-blur-md z-40 justify-center items-center flex overflow-y-auto py-10 md:py-20">
        <div className="bg-primaryBackground rounded-xl p-6 mx-4 flex flex-col gap-6 w-full max-w-[700px]"> {/* Adjusted max-width */}
          <h1 className="text-2xl text-primaryColor font-bold text-center">{t("title")}</h1>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="w-full h-10 border-2 border-secondaryColor px-4 rounded-md"
              placeholder={t("namePlaceholder")}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="w-full h-10 border-2 border-secondaryColor px-4 rounded-md"
              placeholder={t("emailPlaceholder")}
            />
            <PhoneInput
              className="phone-input-container md:col-span-2 border-2 border-secondaryColor h-10 bg-white px-2 rounded-md" // Custom class for styling
              placeholder={t("phonePlaceholder")}
              value={phoneNumber}
              onChange={handlePhoneChange}
              defaultCountry="FR" // Set a default country, e.g., France
            />
          </div>

          {/* Services Selection */}
          <div>
            <h2 className="text-lg text-primaryColor font-semibold mb-3">{t("servicesTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
              {topographyServices.map((service) => (
                <div key={service.id} className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceChange(service.id)}
                  />
                  <Label htmlFor={service.id} className="flex-1 cursor-pointer text-sm">
                    {service.name} <span className="text-xs text-gray-600">({service.price} MAD)</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="w-full border-2 border-secondaryColor p-3 rounded-md"
            placeholder={t("infoPlaceholder")}
            rows={3}
          ></textarea>

          <Separator />

          {/* Total and Submit */}
          <div className="flex flex-col items-end mt-4">
            <div className="text-xl font-semibold mb-3">
              <span className="text-primaryColor/90">{t("totalLabel")}: </span>
              <span>{total.toFixed(2)} MAD</span>
            </div>
            <Button
              className="w-full md:w-auto"
              type="submit"
              disabled={loading || selectedServices.length === 0}
            >
              {loading ? t("submittingButton") : t("submitButton")}
            </Button>
          </div>
        </div>
      </div>
      {/* Simple CSS for PhoneInput wrapper if needed for border consistency */}
      <style jsx global>{`
        .phone-input-container .PhoneInputInput {
          border: none !important;
          box-shadow: none !important;
          height: 100%;
        }
        .phone-input-container .PhoneInputCountrySelect {
            margin-right: 0.5rem;
        }
      `}</style>
    </form>
  );
};

export default DevisModal;
