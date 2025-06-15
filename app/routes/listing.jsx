import React, { useState } from "react";

export default function Listing() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fee: "",
    location: "",
    system: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formPayload = new FormData();
      console.log("Form Data", formData);

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formPayload.append(key, value);
        }
      });

      for (let [key, value] of formPayload.entries()) {
        console.log(key, value);
      }
      const response = await fetch("http://localhost:4000/api/schools/create", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formPayload,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create school");
      }

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          location: "",
          type: "",
          fee: "",
          contact: "",
          system: "",
          image: null,
        });
      }
    } catch (error) {
      setError("Could not create school");
    } finally {
      setIsSubmitting(false);
    }
  };

  //try catch block so as to facilitate api requests

  return (
    <main className="text-black h-full flex items-center justify-center">
      <style>
        {`
                    main {
                            min-height: 100vh;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `}
      </style>
      <div>
        <h1 className="lg:text-[30px] text-center mb-[30px]">
          Provide your school info
        </h1>
        <div
          className="lg:w-[480px] w-[350px] p-[20px] lg:p-[100px]"
          style={{
            border: "3px solid #ccc",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          {error && (
            <div className="bg-red-500 text-black p-[10px] rounded-[10px] mt-[20px]">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-black p-[10px] rounded-[10px] mt-[30px]">
              School created succesfully thank you{" "}
            </div>
          )}
          <h2 className="lg:text-[30px] text-blue-600 font-extrabold text-center text-[30px]">
            Upload an Image
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" />
            <button
              className="bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Upload
            </button>

            <FormSpacer>
              <Label text="Name" />
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter school name"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Location" />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="School Location"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Type" />
              <Input
                name="type"
                value={formData.type}
                onChange={handleChange}
                type="text"
                placeholder="Public/Private/International"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Fees per term" />
              <Input
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                type="text"
                placeholder="School fee per term"
              />
            </FormSpacer>

            <FormSpacer>
              <Label
                text="Contact
              Details"
              />
              <Input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                type="text"
                placeholder="Number or email adress"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="School system" />
              <Input
                name="system"
                value={formData.system}
                onChange={handleChange}
                type="text"
                placeholder="CBC ,  8-4-4 etc.."
              />
            </FormSpacer>

            <button
              className="bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight w-full mt-6 hover:bg-white hover:text-black hover:cursor-pointer hover:transition-colors hover:duration-[0.3s] hover:border duration-[0.2s]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating school.." : "Add your school"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export function Label({ htmlFor, text }) {
  return (
    <label className="lg:text-[20px]" htmlFor={htmlFor}>
      {text}
    </label>
  );
}
export function Input({ name, type, placeholder, value, onChange, required }) {
  return (
    <input
      value={value}
      onChange={onChange}
      required={required}
      className="p-[10px] rounded-[10px] bg-transparent border lg:w-[300px] "
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

export function FormSpacer({ children }) {
  return <div className="flex flex-col gap-[5px]">{children}</div>;
}
