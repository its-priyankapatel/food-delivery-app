// Compare current form data with original and return only changed fields
export const getUpdatedFields = (formData, originalData) => {
  const updatedData = {};

  Object.keys(formData).forEach((key) => {
    if (key === "image") {
      if (formData.image) updatedData.image = formData.image; // new image only
    } else if (formData[key] !== originalData[key]) {
      updatedData[key] = formData[key];
    }
  });

  return updatedData;
};

// Validate required fields if they are modified
export const validateRequiredFields = (updatedData, requiredFields) => {
  for (const field of requiredFields) {
    if (
      updatedData[field] !== undefined &&
      (!updatedData[field] || updatedData[field].toString().trim() === "")
    ) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`;
    }
  }
  return null;
};
