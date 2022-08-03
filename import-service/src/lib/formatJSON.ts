export const formatJSONResponse = (response: Record<string, unknown>, statusCode, headers?) => {
    return {
        headers,
        statusCode,
        body: JSON.stringify(response)
    }
}