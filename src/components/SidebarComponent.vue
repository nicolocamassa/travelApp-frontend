<template lang="">
    <aside>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                    <router-link to="travels">Travels</router-link>
                    <router-link to="calendar">Calendar</router-link>
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
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        nav{
            width: 100%;
            height: 100%;
            background-color: blue;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            padding: 20px;

            ul{
                list-style: none;

                li{
                    display: flex;
                    flex-direction: column;
                }
                
            }
        }
    }
</style>