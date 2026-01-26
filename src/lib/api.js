export const API_URL = "https://localhost:7097/api/Indicadores";

// Fetch all indicators
export async function fetchIndicadores() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener indicadores");
    return response.json();
}

// Fetch single indicator by ID
export async function fetchIndicadorById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el indicador");
    return response.json();
}

// Create indicator
export async function createIndicador(indicador) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indicador)
    });
    const text = await response.text();
    return { ok: response.ok, text };
}

// Update indicator
export async function updateIndicador(id, indicador) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indicador)
    });
    const text = await response.text();
    return { ok: response.ok, text };
}

// Delete indicator
export async function deleteIndicador(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const text = await response.text();
    return { ok: response.ok, text };
}

// Fetch by type
export async function fetchIndicadoresByTipo(tipo) {
    const response = await fetch(`${API_URL}/tipo/${tipo}`);
    if (!response.ok) throw new Error("Error al filtrar por tipo");
    return response.json();
}

// Fetch by category
export async function fetchIndicadoresByCategoria(categoria) {
    const response = await fetch(`${API_URL}/categoria/${categoria}`);
    if (!response.ok) throw new Error("Error al filtrar por categoría");
    return response.json();
}

// Fetch by scope
export async function fetchIndicadoresByAmbito(ambito) {
    const response = await fetch(`${API_URL}/ambito/${ambito}`);
    if (!response.ok) throw new Error("Error al filtrar por ámbito");
    return response.json();
}

// Stats endpoints
export async function fetchTotalPorTipo() {
    const response = await fetch(`${API_URL}/total-por-tipo`);
    if (!response.ok) throw new Error("Error al obtener estadísticas por tipo");
    return response.json();
}

export async function fetchTotalPorCategoria() {
    const response = await fetch(`${API_URL}/total-por-categoria`);
    if (!response.ok) throw new Error("Error al obtener estadísticas por categoría");
    return response.json();
}

export async function fetchTotalPorAmbito() {
    const response = await fetch(`${API_URL}/total-por-ambito`);
    if (!response.ok) throw new Error("Error al obtener estadísticas por ámbito");
    return response.json();
}

// Format date to locale string
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES');
}

// Format date to ISO date (for inputs)
export function formatDateForInput(dateString) {
    return new Date(dateString).toISOString().split("T")[0];
}
