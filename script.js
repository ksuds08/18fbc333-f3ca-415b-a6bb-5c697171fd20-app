document.getElementById('resumeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const jobTitle = document.getElementById('jobTitle').value;
    const industry = document.getElementById('industry').value;
    
    try {
        const response = await axios.post('/functions/api/handler.ts', { jobTitle, industry });
        const templates = response.data.templates;
        const suggestionsContainer = document.getElementById('templateSuggestions');
        suggestionsContainer.innerHTML = '';

        templates.forEach(template => {
            const templateDiv = document.createElement('div');
            templateDiv.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md', 'mb-4');
            templateDiv.innerHTML = `
                <h3 class="text-lg font-semibold text-gray-800">${template.title}</h3>
                <p class="text-gray-600">${template.description}</p>
                <button class="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">Customize</button>
            `;
            suggestionsContainer.appendChild(templateDiv);
        });
    } catch (error) {
        console.error('Error fetching templates:', error);
    }
});