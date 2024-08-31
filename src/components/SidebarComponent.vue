<template lang="">
    <div class="occ">
    <aside>
        <nav>
            <ul>
                <li>
                    <router-link to="/"><div class="sidebar-options-container"><img src="/home-icon.svg" alt=""></div></router-link>
                    <router-link to="travels"><div class="sidebar-options-container"><img src="/plane-icon.svg" alt=""></div></router-link>
                    <router-link to="calendar"><div class="sidebar-options-container"><img src="/calendar-icon.svg" alt=""></div></router-link>
                </li>
            </ul>
        </nav>
    </aside>
</div>
</template>
<script>
export default {
    name: 'SidebarComponent',
}
</script>
<style lang="scss">
    .occ{
        width: 100px;
        height: 100vh;
    }

  aside {
    width: 100px;
    height: 100vh;
    padding: 10px;
    position: fixed;

    nav {
        width: 100%;
        height: 100%;
        border-radius: 100px;
        padding: 20px;
        background-color: rgb(255, 255, 255);
        
        ul {
            list-style: none;

                .sidebar-options-container {
                    width: 40px;
                    height: 40px;
                    padding: 7px;
                    border-radius: 100px;
                }

                .router-link-active .sidebar-options-container {
                    background-color: #BDDAFF; /* Cambia il colore di sfondo a blu quando attivo */

                    img {
                        filter: invert(42%) sepia(89%) saturate(408%) hue-rotate(180deg) brightness(92%) contrast(92%);
                    }
                }

                img {
                    width: 100%;
                    filter: invert(100%) sepia(0%) saturate(7015%) hue-rotate(187deg) brightness(107%) contrast(60%);
                }
            }
        }
    }


@media (max-width: 768px) {
    .occ{
        width: 0px;
        height: 0px;
    }

    aside {
        width: calc(100% - 20px);
        height: 100px;
        display: flex;
        padding: 10px;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);

    nav {
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-radius: 100px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: rgb(255, 255, 255);

        ul {
            list-style: none;
            width: 100%;

            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;

                .sidebar-options-container {
                    margin-bottom: 10px;
                    width: 40px;
                    height: 40px;
                    padding: 7px;
                    border-radius: 100px;
                }
            }
        }
    }
    }
}


</style>