import { ItemCustomComponent, ItemStack, Player, EquipmentSlot, ItemComponentMineBlockEvent } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/ItemDurabilityDamage";

/**
 * 採掘耐久減少
 */
export class MineDurability implements ItemCustomComponent {

    onMineBlock(event:ItemComponentMineBlockEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}
