// YouTube video URL regex pattern to match various YouTube URL formats
export const trailerUrlRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|attribution_link\?a=|yts\/v|v\/)|youtu\.be\/)([A-Za-z0-9_-]+)/;

// Shortened YouTube URL regex pattern (youtu.be)
export const trailerYoutube = /youtu\.be\/([A-Za-z0-9_-]+)/;

// Image URL regex pattern to match common image formats (jpg, jpeg, png, gif, bmp)
export const imageUrlRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

// Regex pattern to match positive numbers (including decimals and scientific notation)
export const positiveNumberRegex =
  /^[+]?((0*[1-9]+\d*)|(\d*\.\d+([eE][-+]?\d+)?))$/;

// Regex for matching specific prices in United States format (from 75,000 to 200,000)
export const unitedStatesPriceRegex =
  /^(75000(\.0+)?|7[5-9]\d{3}(\.\d+)?|[89]\d{4}(\.\d+)?|1\d{5}(\.\d+)?|200000)$/;

// General price regex pattern to handle large numbers with commas
export const priceRegex =
  /^(75000(,0+)?|7[5-9]\d{3}(,\d+)?|[89]\d{4}(,\d+)?|1\d{5}(,\d+)?|200000)$/;
