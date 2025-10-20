// JS puro — sem frameworks.
// Funcionalidades: menu mobile, tema claro/escuro com persistência, validação + simulação de envio.

(function (){
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // Ano no rodapé
  $("#ano").textContent = new Date().getFullYear();

  // Menu responsivo
  const menuBtn = $(".menu-toggle");
  const nav = $("#nav");
  menuBtn?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
  // Fechar menu ao clicar em link (mobile)
  $$("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  // Tema claro/escuro com persistência em localStorage
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark"; // padrão: dark
  if(savedTheme === "light"){ root.classList.add("light"); }
  themeToggle?.addEventListener("click", () => {
    root.classList.toggle("light");
    const current = root.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", current);
  });

  // Validação do formulário de contato
  const form = $("#contatoForm");
  const modal = $("#modalSucesso");
  const closeEls = $$("[data-close]", modal);

  const setError = (id, msg) => { const el = $("#erro-" + id); if(el){ el.textContent = msg; } };
  const clearErrors = () => ["nome","email","mensagem"].forEach(id => setError(id, ""));

  const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const nome = $("#nome").value.trim();
    const email = $("#email").value.trim();
    const mensagem = $("#mensagem").value.trim();

    let ok = true;

    if(nome.length < 3){
      setError("nome", "Informe seu nome completo (mín. 3 caracteres).");
      ok = false;
    }
    if(!emailRegex.test(email)){
      setError("email", "Informe um e-mail válido (ex.: usuario@dominio.com).");
      ok = false;
    }
    if(mensagem.length < 10){
      setError("mensagem", "Digite uma mensagem com ao menos 10 caracteres.");
      ok = false;
    }

    if(!ok) return;

    // Simulação de envio: "salva" em memória por alguns segundos e exibe sucesso
    const payload = { nome, email, mensagem, quando: new Date().toISOString() };
    console.log("Simulação de envio:", payload);

    form.reset(); // limpa campos

    if(typeof modal?.showModal === "function"){
      modal.showModal();
    } else {
      alert("Mensagem enviada com sucesso!");
    }
  });

  closeEls.forEach(btn => btn.addEventListener("click", () => modal?.close()));

  // Fechar modal ao pressionar ESC
  modal?.addEventListener("cancel", (e) => { e.preventDefault(); modal.close(); });
})();