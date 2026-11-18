export async function loadData(file) {
    try {
        let response = await fetch("data/" + file);

        if (!response.ok) {
            throw new Error("Data not found");
        }

        return await response.json();

    } catch (error) {
        console.log(error);
        return [];
    }
}