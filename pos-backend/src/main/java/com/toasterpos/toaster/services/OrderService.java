package com.toasterpos.toaster.services;

import com.toasterpos.toaster.models.*;
import com.toasterpos.toaster.models.dtos.*;
import com.toasterpos.toaster.respositories.*;
import com.toasterpos.toaster.utils.ResponseDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public OrderResponseDto createOrder(OrderDto order) {
        Customer customer = customerRepository.findById(order.getCustomerId()).orElse(null);
        Employee employee = employeeRepository.findById(order.getEmployeeId()).orElse(null);
        Order newOrder = new Order();
        newOrder.setCustomer(customer);
        newOrder.setEmployee(employee);
        newOrder.setCompleted(false);
        newOrder.setGrossTotal(order.getGrossTotal());
        newOrder.setOrderDate(Optional.ofNullable(order.getOrderDate()).orElse(OffsetDateTime.now()));
        Order savedOrder = orderRepository.save(newOrder);
        List<OrderItem> orderItems = createOrderItems(order, savedOrder);
        savedOrder.setOrderItems(orderItems);
        return ResponseDtoUtils.copyOrderResponse(savedOrder);
    }

    public OrderItem createOrderItem(OrderItemDto orderItemDto) {
        Order order = orderRepository.findById(orderItemDto.getOrderId()).orElseThrow();
        Item item = itemRepository.findById(orderItemDto.getItemId()).orElseThrow();
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOrder(order);
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setSoldPrice(item.getPrice());
        return orderItemRepository.save(orderItem);
    }

    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream().filter(Objects::nonNull).map(ResponseDtoUtils::copyOrderResponse).collect(Collectors.toList());
    }

    public List<OrderResponseDto> getWaitingOrders() {
        return orderRepository.findWaitingOrder().stream().filter(Objects::nonNull).map(ResponseDtoUtils::copyOrderResponse).collect(Collectors.toList());
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    private List<OrderItem> createOrderItems(OrderDto order, Order savedOrder) {
        return order.getOrderItems().stream().filter(stringLongMap -> stringLongMap.containsKey("itemId") && stringLongMap.containsKey("quantity"))
                .map(stringLongMap -> {
                    Item item = itemRepository.findById(stringLongMap.get("itemId")).orElse(null);
                    if(item != null){
                        OrderItem orderItem = new OrderItem();
                        orderItem.setItem(item);
                        orderItem.setQuantity(stringLongMap.get("quantity").intValue());
                        orderItem.setSoldPrice(item.getPrice());
                        orderItem.setOrder(savedOrder);
                        return orderItem;
                    }
                    return null;
                }).filter(Objects::nonNull)
                .map(orderItem -> orderItemRepository.save(orderItem)).collect(Collectors.toList());
    }

    public void deleteOrderById(Long orderId) {
        Order orderToBeDeleted = orderRepository.findById(orderId).orElseThrow();
        orderToBeDeleted.getOrderItems().forEach(orderItem -> orderItemRepository.deleteById(orderItem.getOrderItemId()));
        orderRepository.deleteById(orderId);
    }

    public OrderResponseDto markOrderComplete(Long orderId) {
        Order order = getOrderById(orderId).orElseThrow();
        order.setCompleted(true);
        var savedOrder = orderRepository.save(order);
        return ResponseDtoUtils.copyOrderResponse(savedOrder);
    }

    public List<OrderResponseDto> getCompletedOrders() {
        return orderRepository.findCompletedOrder().stream().filter(Objects::nonNull).map(ResponseDtoUtils::copyOrderResponse).collect(Collectors.toList());
    }
}
