<script setup>

import { useQuasar } from 'quasar'
const $q = useQuasar()

</script>

<template>
    <q-separator />
    <div class="container_footer lg:inline-flex">
        <div class="box_footer">
            <div class="logo">
                <p>leasy</p>
            </div>
        </div>
        <div class="box_footer">
            <h2>About</h2>
            <a href="#">Features</a>
            <a href="#">Support</a>
        </div>
        <div class="box_footer">
            <h2>Blog</h2>
            <a href="#">Products</a>
            <a href="#">Technology</a>
        </div>
        <div class="box_footer">
            <h2>Webflow</h2>
            <a href="#">Licensing</a>
            <a href="#">Changelog</a>
        </div>
        <div class="box_footer">
            <h2>Social Media</h2>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
        </div>
    </div>
    <div class="box_copyright">
        <hr>
        <p>2022 Leasy. Todos los derechos reservados.</p>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    body {
        display: block;
    }
}

footer {
    width: 100%;
    padding: 50px 0px;
    background-color: rgb(222, 255, 248);
}

.container_footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: auto;
}

.box_footer {
    display: flex;
    flex-direction: column;
    padding: 40px;
}

.box_footer .logo {
    max-width: 300px;
    font-weight: bold;
    color: #7cb8a9;
    font-size: 24px;
    font-family: Verdana, sans-serif;
}

.box_footer h2 {
    text-align: center;
    margin-bottom: 15px;
    color: #1e1d22;
    font-weight: bold;
    font-size: 15px;
    font-family: Arial, sans-serif;
}

.box_footer a {
    text-align: center;
    margin-top: 10px;
    color: #606060;
    text-decoration: none;
    font-weight: 350;
    font-size: 12px;
    font-family: Arial, sans-serif;
}

.box_copyright {
    max-width: 1200px;
    margin: auto;
    text-align: center;
    padding: 0px 40px;
}

.box_copyright p {
    margin-top: 20px;
    color: #606060;
    font-size: 13px;
    font-family: Arial, sans-serif;
}

.box_copyright hr {
    border: none;
    height: 1px;
    background-color: #606060;
}
</style>


