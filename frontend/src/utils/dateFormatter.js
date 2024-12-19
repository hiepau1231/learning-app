export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
