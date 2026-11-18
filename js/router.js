export function router(render) {
    window.addEventListener("hashchange", render);
    render();
}


