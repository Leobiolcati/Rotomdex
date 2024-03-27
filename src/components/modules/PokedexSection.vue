<template>
    <div>
        <section
            class="rounded-2xl border-4 bg-white text-black border-black p-2 flex flex-col items-center justify-center">
            <h2 class="rounded-2xl bg-black text-white border-2 border-slate p-2 text-center">
                <slot name="title"></slot>
            </h2>
            <div class="flex flex-row items-center justify-center">
                <slot name="sprite_normal" class="mx-auto"></slot>
                <slot name="sprite_shiny" class="mx-auto"></slot>
            </div>
            <div class="text-white flex flex-row items-center justify-center p-2 space-x-4 font-bold">
                <slot name="type1"></slot>
                <slot name="type2"></slot>
            </div>
            <div class="text-black flex flex-col items-center">
                <slot name="hp"></slot><br>
                <slot name="attack"></slot><br>
                <slot name="defense"></slot><br>
                <slot name="sp_attack"></slot><br>
                <slot name="sp_defense"></slot><br>
                <slot name="speed"></slot><br>
                <slot name="total"></slot><br>
            </div>
        </section>
    </div>
</template>
