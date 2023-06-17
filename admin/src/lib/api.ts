export const sendContactForm = async (data: object) => {
  try {
    const response: any = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.log(error, "error");
  }
};
