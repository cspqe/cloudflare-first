export async function fetchImage(domain) {
    const baseUrl = 'https://e-flovv.biz/dimage.php?dx2';
    const imageUrl = `${baseUrl}${domain}`;
  
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Something went wrong, try again later');
      }
  
      const imageSrc = await response.text(); // Get the URL as text
      return imageSrc;
    } catch (error) {
      return 'Something went wrong, try again later';
    }
  }
  