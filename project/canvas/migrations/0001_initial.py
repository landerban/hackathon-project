# Generated by Django 5.1.3 on 2024-11-09 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Canvas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background_image', models.ImageField(default='/srcs/fallback.png', max_length=150, upload_to='srcs/')),
                ('credits', models.CharField(default='No Credits', max_length=150)),
                ('time_control', models.CharField(choices=[('blitz', 'Blitz'), ('rapid', 'Rapid'), ('standard', 'Standard')], default='blitz', max_length=8)),
                ('color_pallette1', models.CharField(default='#a33a41', max_length=7)),
                ('color_pallette2', models.CharField(default='#ea6d57', max_length=7)),
                ('color_pallette3', models.CharField(default='#ffdc80', max_length=7)),
                ('color_pallette4', models.CharField(default='#ffe8f0', max_length=7)),
                ('color_pallette5', models.CharField(default='#f0596a', max_length=7)),
                ('color_pallette6', models.CharField(default='#000000', max_length=7)),
                ('color_pallette7', models.CharField(default='#251832', max_length=7)),
                ('color_pallette8', models.CharField(default='#feeaf3', max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Pixels',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('canvas_id', models.IntegerField()),
                ('pixel_x', models.IntegerField()),
                ('pixel_y', models.IntegerField()),
                ('pixel_color', models.CharField(default='#ffffff', max_length=7)),
            ],
        ),
    ]
