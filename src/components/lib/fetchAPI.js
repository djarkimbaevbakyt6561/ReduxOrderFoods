export const fetchRequest = async (urlPath, options = {}) => {
    try {
        const url = 'http://ec2-3-70-250-130.eu-central-1.compute.amazonaws.com:5500/api/v1'
        const requestOptions = {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                UserID: "Bakyt",
            },
        }
        if (options.body) {
            requestOptions.body = JSON.stringify(options.body)
        }
        const response = await fetch(`${url}${urlPath}`, requestOptions)
        const data = await response.json()
        return data.data
    } catch (error) {
        new Error(error)
        console.log(error);
    }

}