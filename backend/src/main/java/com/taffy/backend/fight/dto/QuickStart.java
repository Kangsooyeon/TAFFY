package com.taffy.backend.fight.dto;

public enum QuickStart {
    QUICK_START("quick"),
    NOT_FOUND("notfound");

    public final String startType ;

    QuickStart(String s){
        this.startType = s;
    }

    public String getStartType(){
        return startType;
    }
}
