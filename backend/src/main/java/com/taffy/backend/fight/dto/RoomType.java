package com.taffy.backend.fight.dto;

public enum RoomType {
    PRIVATE("private"),
    PUBLIC("public");

    public final String roomType;
    RoomType(String roomType) {
            this.roomType =roomType;
    }

    public String getRoomType(){
        return roomType;
    }

    public String getSaveRoomType(){
        return roomType+":";
    }
}
