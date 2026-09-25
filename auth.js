import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://obyxjtbdwgafrmfoefof.supabase.co";

const SUPABASE_KEY = "sb_publishable_shEbDUHdpbrOISJeEG1F1Q_67lDSoNR";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// CADASTRO
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

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

            message.style.color = "#ff6b6b";

            message.textContent =
                "O nome de usuário precisa ter pelo menos 3 caracteres.";

            return;
        }


        // Verificar senha

        if (password.length < 6) {

            message.style.color = "#ff6b6b";

            message.textContent =
                "A senha precisa ter pelo menos 6 caracteres.";

            return;
        }


        // Verificar confirmação da senha

        if (password !== confirmPassword) {

            message.style.color = "#ff6b6b";

            message.textContent =
                "As senhas não são iguais.";

            return;
        }


        message.style.color = "#ffffff";

        message.textContent =
            "Criando sua conta...";


        // Criar conta no Supabase

        const { error } =
            await supabase.auth.signUp({

                email: email,

                password: password,

                options: {

                    emailRedirectTo:
                        "https://darkkk7.github.io/pokemon-community/confirmar.html",

                    data: {

                        username: username

                    }

                }

            });


        // Verificar erro

        if (error) {

            console.error(error);

            message.style.color = "#ff6b6b";

            message.textContent =
                "Erro: " + error.message;

            return;
        }


        // Sucesso

        message.style.color = "#70e000";

        message.textContent =
            "Conta criada! Verifique seu e-mail para confirmar o cadastro.";

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

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


        // Fazer login

        const { error } =
            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });


        // Verificar erro

        if (error) {

            console.error(error);

            message.style.color = "#ff6b6b";

            message.textContent =
                "Login inválido: " + error.message;

            return;
        }


        // Login realizado

        message.style.color = "#70e000";

        message.textContent =
            "Login realizado com sucesso!";


        // Voltar para o site

        setTimeout(function() {

            window.location.href =
                "index.html";

        }, 800);

    });

}
