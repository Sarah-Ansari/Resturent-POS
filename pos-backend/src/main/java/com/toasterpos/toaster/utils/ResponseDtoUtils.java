package com.toasterpos.toaster.utils;

import com.toasterpos.toaster.models.*;
import com.toasterpos.toaster.models.dtos.*;
import com.toasterpos.toaster.services.OrderService;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class ResponseDtoUtils {
    public static OrderResponseDto copyOrderResponse(Order savedOrder) {
        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setOrderId(savedOrder.getOrderId());
        orderResponseDto.setOrderDate(savedOrder.getOrderDate());
        orderResponseDto.setDiscount(savedOrder.getDiscount());
        orderResponseDto.setCompleted(savedOrder.isCompleted());
        orderResponseDto.setCustomer(copyCustomerResponse(savedOrder.getCustomer()));
        orderResponseDto.setGrossTotal(savedOrder.getGrossTotal());
        orderResponseDto.setNetTotal(savedOrder.getNetTotal());
        orderResponseDto.setOrderItems(savedOrder.getOrderItems().stream().map(ResponseDtoUtils::copyOrderItemResponse).collect(Collectors.toList()));
        orderResponseDto.setEmployee(copyEmployeeResponse(savedOrder.getEmployee()));
        return orderResponseDto;
    }

    public static CustomerResponseDto copyCustomerResponse(Customer customer){
        CustomerResponseDto customerResponseDto = new CustomerResponseDto();
        customerResponseDto.setCustomerId(customer.getCustomerId());
        customerResponseDto.setName(customer.getName());
        customerResponseDto.setContactNumber(customer.getContactNumber());
        customerResponseDto.setDateOfBirth(customer.getDateOfBirth());
        customerResponseDto.setEmail(customer.getEmail());
        customerResponseDto.setOrders(customer.getOrders().stream().filter(Objects::nonNull).map(Order::getOrderId).collect(Collectors.toList()));
        customerResponseDto.setCreatedAt(customer.getCreatedAt());
        customerResponseDto.setModifiedAt(customer.getModifiedAt());
        return customerResponseDto;
    }

    public static EmployeeResponseDto copyEmployeeResponse(Employee employee){
        EmployeeResponseDto employeeResponseDto = new EmployeeResponseDto();
        employeeResponseDto.setEmployeeId(employee.getEmployeeId());
        employeeResponseDto.setName(employee.getName());
        employeeResponseDto.setAddress(employee.getAddress());
        employeeResponseDto.setPhone(employee.getPhone());
        employeeResponseDto.setPosition(employee.getPosition());
        employeeResponseDto.setDateOfBirth(employee.getDateOfBirth());
        employeeResponseDto.setEmail(employee.getEmail());
        employeeResponseDto.setOrders(Optional.ofNullable(employee.getOrders()).stream().flatMap(List::stream).filter(Objects::nonNull).map(Order::getOrderId).collect(Collectors.toList()));
        return employeeResponseDto;
    }

    public static OrderItemResponseDto copyOrderItemResponse(OrderItem orderItem){
        OrderItemResponseDto orderItemResponseDto = new OrderItemResponseDto();
        orderItemResponseDto.setOrderItemId(orderItem.getOrderItemId());
        orderItemResponseDto.setSoldPrice(orderItem.getSoldPrice());
        orderItemResponseDto.setQuantity(orderItem.getQuantity());
        orderItemResponseDto.setItemName(orderItem.getItem().getName());
        return orderItemResponseDto;
    }

    public static ReservationResponseDto copyReservationResponse(Reservation reservation){
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();
        reservationResponseDto.setReservationId(reservation.getReservationId());
        reservationResponseDto.setReservationFrom(reservation.getReservationFrom());
        reservationResponseDto.setReservationTo(reservation.getReservationTo());
        reservationResponseDto.setCustomer(copyCustomerResponse(reservation.getCustomer()));
        return reservationResponseDto;
    }
}
