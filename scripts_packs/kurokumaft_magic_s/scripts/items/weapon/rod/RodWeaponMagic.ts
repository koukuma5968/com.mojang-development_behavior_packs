import { Entity, EquipmentSlot, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { shooting } from "../../../common/ShooterMagicEvent";
import { itemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { bumrod, burstflare, flarecircle } from "./FlameMagic";
import { watercutter, waterjail, waterwave } from "./WaterWaveMagic";
import { aerobomb, storm, stormBread } from "./StormMagic";
import { greybomb, rockbreak, stoneBread } from "./RockMagic";
import { lightningBread, thunderclap, thunderjail } from "./ThunderclapMagic";
import { freezConclusion, iceBread } from "./FreezeMagic";
import { brushash, darkFang, summonSkeleton } from "./DarknessMagic";
import { areaheel, lightFang, summonGolem } from "./BrightnessMagic";

interface RodFuncMagicObject {
    itemName:string,
    sendMsg:string,
    func: CallableFunction
}

interface RodMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number
}

const RodHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: bumrod,
        sendMsg: "magic.kurokumaft:bumrod.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: watercutter,
        sendMsg: "magic.kurokumaft:watercutter.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: stormBread,
        sendMsg: "magic.kurokumaft:stormBread.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: stoneBread,
        sendMsg: "magic.kurokumaft:stoneBread.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: lightningBread,
        sendMsg: "magic.kurokumaft:lightningBread.translate"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: iceBread,
        sendMsg: "magic.kurokumaft:iceBread.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: darkFang,
        sendMsg: "magic.kurokumaft:darkFang.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: lightFang,
        sendMsg: "magic.kurokumaft:lightFang.translate"
    }

]);

const RodShotMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:freeze_rod",
        event: "kurokumaft:ice_barrette_magic",
        sendMsg: "magic.kurokumaft:ice_barrette.translate",
        addition: 4
    }

]);

const RodRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: flarecircle,
        sendMsg: "magic.kurokumaft:flarecircle.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterwave,
        sendMsg: "magic.kurokumaft:waterwave.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: storm,
        sendMsg: "magic.kurokumaft:storm.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: rockbreak,
        sendMsg: "magic.kurokumaft:rockbreak.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderclap,
        sendMsg: "magic.kurokumaft:thunderclap.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: brushash,
        sendMsg: "magic.kurokumaft:brushash.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: areaheel,
        sendMsg: "magic.kurokumaft:areaheel.translate"
    }

]);

const RodRightFuncMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: burstflare,
        sendMsg: "magic.kurokumaft:burstflare.translate"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterjail,
        sendMsg: "magic.kurokumaft:waterjail.translate"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: aerobomb,
        sendMsg: "magic.kurokumaft:aerobomb.translate"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: greybomb,
        sendMsg: "magic.kurokumaft:greybomb.translate"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderjail,
        sendMsg: "magic.kurokumaft:thunderjail.translate"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: freezConclusion,
        sendMsg: "magic.kurokumaft:freezConclusion.translate"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: summonSkeleton,
        sendMsg: "magic.kurokumaft:summonSkeleton.translate"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: summonGolem,
        sendMsg: "magic.kurokumaft:summonGolem.translate"
    }

]);

/**
 * ロッド系魔法
 */
export class RodWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        let wandMagicObject = RodHitObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
        wandMagicObject.func(attackEntity, hitEntity);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + wandMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (player.isSneaking) {
            let rodFuncMagicObject = RodRightFuncMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
            if (rodFuncMagicObject) {
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + rodFuncMagicObject.sendMsg + "\"}]}");
                rodFuncMagicObject.func(player);
            }
        } else {
            let rodShotMagicObject = RodShotMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
            if (rodShotMagicObject) {

                shooting(player, rodShotMagicObject.event, 0, rodShotMagicObject.addition, undefined);
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + rodShotMagicObject.sendMsg + "\"}]}");
            }
            let rodRightOneMagicObject = RodRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodFuncMagicObject;
            if (rodRightOneMagicObject) {
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + rodRightOneMagicObject.sendMsg + "\"}]}");
                rodRightOneMagicObject.func(player);
            }
        }

        itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

    }

}