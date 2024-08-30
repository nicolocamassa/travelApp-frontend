<template lang="">
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
</template>
<script>
export default {
    name: 'SidebarComponent',
}
</script>
<style lang="scss">
    aside{
        width: 100px;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        nav{
            width: 100%;
            height: 100%;
            background-color: rgb(255, 255, 255);
            border-radius: 100px;
            display: flex;
            justify-content: center;
            padding: 20px;

            ul{
                list-style: none;

                li{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    

                    .sidebar-options-container{
                        margin-bottom: 10px;
                        width: 40px;
                        height: 40px;
                        padding: 7px;
                        border-radius: 100px;
                    }

                    .router-link-active .sidebar-options-container {
                        background-color: #BDDAFF; /* Cambia il colore di sfondo a rosso quando attivo */

                        img{
                            filter: invert(42%) sepia(89%) saturate(408%) hue-rotate(180deg) brightness(92%) contrast(92%);
                        }
                    }

                    img{
                        width: 100%;
                        filter: invert(100%) sepia(0%) saturate(7015%) hue-rotate(187deg) brightness(107%) contrast(60%);
                    }
                }
                
            }
        }
    }
</style>