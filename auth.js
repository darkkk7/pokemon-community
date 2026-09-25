import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://obyxjtbdwgafrmfoefof.supabase.co";
const SUPABASE_KEY = "sb_publishable_shEbDUHdpbrOISJeEG1F1Q_67lDSoNR";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// CADASTRO
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("message");


        message.style.color = "#ffffff";


        // Verificar nome de usuário

        if (username.length < 3) {

            message.textContent =
                "O nome de usuário precisa ter pelo menos 3 caracteres.";

            return;
        }


        // Verificar senha

        if (password !== confirmPassword) {

            message.textContent =
                "As senhas não são iguais.";

            return;
        }


        if (password.length < 6) {

            message.textContent =
                "A senha precisa ter pelo menos 6 caracteres.";

            return;
        }


        message.textContent =
            "Criando sua conta...";


        // Criar usuário

        const { error } =
            await supabase.auth.signUp({

                email: email,

                password: password,

                options: {

                    data: {

                        username: username

                    }

                }

            });


        if (error) {

            message.style.color = "#ff6b6b";

            message.textContent =
                "Erro: " + error.message;

            return;
        }


        message.style.color = "#70e000";

        message.textContent =
            "Conta criada! Verifique seu e-mail para confirmar o cadastro.";

    });

}


// ================================
// LOGIN
// ================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("message");


        message.style.color = "#ffffff";

        message.textContent =
            "Entrando...";


        const { error } =
            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            message.style.color = "#ff6b6b";

            message.textContent =
                "Login inválido: " + error.message;

            return;
        }


        message.style.color = "#70e000";

        message.textContent =
            "Login realizado com sucesso!";


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);

    });

}
