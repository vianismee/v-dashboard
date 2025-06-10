const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  export default formatDate