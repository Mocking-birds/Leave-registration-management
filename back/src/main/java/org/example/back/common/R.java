package org.example.back.common;

import lombok.Data;

//通用返回结果

@Data
public class R<T> {
    private T data;
    private Integer status;
    private String message;

    public static <T> R<T> success(T data,String message) {
        R<T> r = new R<T>();
        r.data = data;
        r.status = 0;
        r.message = message;

        return r;
    }

    public static <T> R<T> error(String message) {
        R<T> r = new R<T>();
        r.status = 1;
        r.message = message;
        return r;
    }

    public static <T> R<T> tokenError(int status,String message) {
        R<T> r = new R<T>();
        r.status = (Integer) status;
        r.message = message;
        return r;
    }
}
